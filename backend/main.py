from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from fastapi import HTTPException
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from security import verify_token
from auth import hash_password
from fastapi import Header

import models
import schemas

from database import engine, SessionLocal

from auth import (
    hash_password,
    verify_password
)

from security import (
    create_access_token,
    verify_token,
    admin_required
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





# Create tables
models.Base.metadata.create_all(bind=engine)


# Database Dependency
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# Home Route
@app.get("/")
def home():

    return {
        "message": "CampusConnect API"
    }


# Register User
@app.post("/register")
def register_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    hashed_pw = hash_password(
        user.password
    )

    db_user = models.User(
        username=user.username,
        password=hashed_pw,
        role=user.role
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return {
    "id": db_user.id,
    "username": db_user.username,
    "role": db_user.role
}


# Login User
@app.post("/login")
def login_user(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(
        models.User
    ).filter(
        models.User.username == user.username
    ).first()

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Username"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        {
            "sub": db_user.username,
            "role": db_user.role
        }
    )

    return {
    "access_token": token,
    "token_type": "bearer",
    "must_change_password":
        db_user.must_change_password
}
@app.post("/change-password")
def change_password(
    data: schemas.PasswordChange,
    db: Session = Depends(get_db)
):

    user = db.query(
        models.User
    ).filter(
        models.User.username ==
        data.username
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )

    if not verify_password(
        data.old_password,
        user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Wrong Password"
        )

    user.password = hash_password(
        data.new_password
    )

    user.must_change_password = False

    db.commit()

    return {
        "message":
        "Password Updated"
    }
@app.post("/students")
def create_student(
    student_data: schemas.StudentCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):

    existing_user = db.query(
        models.User
    ).filter(
        models.User.username == student_data.username
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    hashed_pw = hash_password(
        student_data.password
    )

    db_user = models.User(
    username=student_data.username,
    password=hashed_pw,
    role="student",
    must_change_password=True
)

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    db_student = models.Student(
        user_id=db_user.id,
        name=student_data.name,
        email=student_data.email,
        phone=student_data.phone,
        branch=student_data.branch,
        year=student_data.year,
        cgpa=0
    )

    db.add(db_student)

    db.commit()

    db.refresh(db_student)

    return {
        "message": "Student Created Successfully",
        "student_id": db_student.id,
        "username": db_user.username
    }
@app.get("/students")
def get_students(
    db: Session = Depends(get_db)
):

    return db.query(
        models.Student
    ).all()

@app.get("/students/{student_id}")
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if student is None:

        return {
            "message": "Student Not Found"
        }

    return student

@app.put("/students/{student_id}")
def update_student(
    student_id: int,
    student_data: schemas.StudentCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if student is None:

        return {
            "message": "Student Not Found"
        }

    student.name = student_data.name
    student.email = student_data.email
    student.phone = student_data.phone
    student.branch = student_data.branch
    student.year = student_data.year
    student.cgpa = student_data.cgpa

    db.commit()

    db.refresh(student)

    return student

@app.get("/students/year/{year}")
def get_students_by_year(
    year: int,
    db: Session = Depends(get_db)
):

    students = db.query(
        models.Student
    ).filter(
        models.Student.year == year
    ).all()

    return students

@app.delete("/students/{student_id}")
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if student is None:

        return {
            "message": "Student Not Found"
        }

    db.delete(student)

    db.commit()

    return {
        "message": "Student Deleted"
    }

@app.post("/academics")
def create_academic_record(
    academic: schemas.AcademicCreate,
    db: Session = Depends(get_db)
):

    existing_record = db.query(
        models.AcademicRecord
    ).filter(
        models.AcademicRecord.student_id == academic.student_id,
        models.AcademicRecord.semester == academic.semester
    ).first()

    if existing_record:

        raise HTTPException(
            status_code=400,
            detail=f"Semester {academic.semester} already exists"
        )

    record = models.AcademicRecord(
        student_id=academic.student_id,
        semester=academic.semester,
        gpa=academic.gpa,
        backlogs=academic.backlogs
    )

    db.add(record)

    db.commit()

    db.refresh(record)

    records = db.query(
    models.AcademicRecord
        ).filter(
    models.AcademicRecord.student_id
    == academic.student_id
    ).all()

    total = sum(
    r.gpa for r in records
        )

    cgpa = round(
    total / len(records),
    2
    )

    student = db.query(
    models.Student
    ).filter(
    models.Student.id
    == academic.student_id
    ).first()

    student.cgpa = cgpa

    db.commit()

    return record
@app.get("/academics/{student_id}")
def get_academic_records(
    student_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        models.AcademicRecord
    ).filter(
        models.AcademicRecord.student_id == student_id
    ).all()

@app.get("/students/{student_id}/cgpa")
def calculate_cgpa(
    student_id: int,
    db: Session = Depends(get_db)
):

    records = db.query(
        models.AcademicRecord
    ).filter(
        models.AcademicRecord.student_id == student_id
    ).all()

    if len(records) == 0:

        return {
            "cgpa": 0
        }

    total = sum(
        record.gpa
        for record in records
    )

    cgpa = total / len(records)

    return {
        "student_id": student_id,
        "cgpa": round(cgpa, 2)
    }

@app.post("/placements")
def create_placement(
    placement: schemas.PlacementCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_required)
):

    drive = models.PlacementDrive(
        company_name=placement.company_name,
        package=placement.package,
        location=placement.location,
        deadline=placement.deadline,
        min_cgpa=placement.min_cgpa,
        description=placement.description
    )

    db.add(drive)

    db.commit()

    db.refresh(drive)

    return drive

@app.get("/placements")
def get_placements(
    db: Session = Depends(get_db)
):

    return db.query(
        models.PlacementDrive
    ).all()

@app.get("/placements/{drive_id}")
def get_placement(
    drive_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        models.PlacementDrive
    ).filter(
        models.PlacementDrive.id == drive_id
    ).first()

@app.post("/apply")
def apply_for_drive(
    application: schemas.ApplicationCreate,
    db: Session = Depends(get_db)
):

    existing_application = db.query(
        models.Application
    ).filter(
        models.Application.student_id == application.student_id,
        models.Application.drive_id == application.drive_id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="Already Applied"
            
        )
    student = db.query(
        models.Student
    ).filter(
        models.Student.id == application.student_id
    ).first()

    drive = db.query(
        models.PlacementDrive
    ).filter(
        models.PlacementDrive.id == application.drive_id
    ).first()

    if student.cgpa < drive.min_cgpa:

        raise HTTPException(
            status_code=400,
            detail="CGPA requirement not met"
        )

    new_application = models.Application(
        student_id=application.student_id,
        drive_id=application.drive_id,
        status="Applied"
    )

    db.add(new_application)

    db.commit()

    db.refresh(new_application)

    return new_application


@app.get("/applications/{student_id}")
def get_student_applications(
    student_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        models.Application
    ).filter(
        models.Application.student_id == student_id
    ).all()

@app.put("/applications/{application_id}")
def update_application_status(
    application_id: int,
    status_data: schemas.StatusUpdate,
    db: Session = Depends(get_db)
):

    application = db.query(
        models.Application
    ).filter(
        models.Application.id == application_id
    ).first()

    if not application:

        return {
            "message": "Application Not Found"
        }

    application.status = status_data.status

    db.commit()

    db.refresh(application)

    return application

@app.post("/sports")
def create_sports_record(
    sports: schemas.SportsCreate,
    db: Session = Depends(get_db)
):

    record = models.SportsRecord(
        student_id=sports.student_id,
        sport=sports.sport,
        achievement=sports.achievement,
        year=sports.year
    )

    db.add(record)

    db.commit()

    db.refresh(record)

    return record

@app.get("/sports/{student_id}")
def get_sports_records(
    student_id: int,
    db: Session = Depends(get_db)
):

    return db.query(
        models.SportsRecord
    ).filter(
        models.SportsRecord.student_id == student_id
    ).all()

@app.delete("/sports/{record_id}")
def delete_sports_record(
    record_id: int,
    db: Session = Depends(get_db)
):

    record = db.query(
        models.SportsRecord
    ).filter(
        models.SportsRecord.id == record_id
    ).first()

    if not record:

        return {
            "message": "Record Not Found"
        }

    db.delete(record)

    db.commit()

    return {
        "message": "Sports Record Deleted"
    }

@app.get("/dashboard/total-students")
def total_students(
    db: Session = Depends(get_db)
):

    count = db.query(
        models.Student
    ).count()

    return {
        "total_students": count
    }

@app.get("/dashboard/students-by-year")
def students_by_year(
    db: Session = Depends(get_db)
):

    result = {}

    for year in [1, 2, 3, 4]:

        result[f"year_{year}"] = db.query(
            models.Student
        ).filter(
            models.Student.year == year
        ).count()

    return result

@app.get("/dashboard/placement-drives")
def placement_drives_count(
    db: Session = Depends(get_db)
):

    count = db.query(
        models.PlacementDrive
    ).count()

    return {
        "placement_drives": count
    }

@app.get("/dashboard/selected-students")
def selected_students(
    db: Session = Depends(get_db)
):

    count = db.query(
        models.Application
    ).filter(
        models.Application.status == "Selected"
    ).count()

    return {
        "selected_students": count
    }

@app.get("/students/search/{name}")
def search_students(
    name: str,
    db: Session = Depends(get_db)
):

    return db.query(
        models.Student
    ).filter(
        models.Student.name.ilike(
            f"%{name}%"
        )
    ).all()


@app.get("/students/branch/{branch}")
def students_by_branch(
    branch: str,
    db: Session = Depends(get_db)
):

    return db.query(
        models.Student
    ).filter(
        models.Student.branch == branch
    ).all()


@app.get("/students/{student_id}/eligible-drives")
def eligible_drives(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        return []

    drives = db.query(
        models.PlacementDrive
    ).filter(
        models.PlacementDrive.min_cgpa <= student.cgpa
    ).all()

    return drives


@app.get("/profile/{student_id}")
def profile(
    student_id: int,
    db: Session = Depends(get_db)
):

    student = db.query(
        models.Student
    ).filter(
        models.Student.id == student_id
    ).first()

    academics = db.query(
        models.AcademicRecord
    ).filter(
        models.AcademicRecord.student_id == student_id
    ).all()

    sports = db.query(
        models.SportsRecord
    ).filter(
        models.SportsRecord.student_id == student_id
    ).all()

    return {
        "student": student,
        "academics": academics,
        "sports": sports
    }


@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db)
):

    return {
        "total_students":
        db.query(models.Student).count(),

        "placement_drives":
        db.query(models.PlacementDrive).count(),

        "selected_students":
        db.query(models.Application)
        .filter(
            models.Application.status == "Selected"
        )
        .count()
    }


@app.get("/dashboard/branches")
def branch_analytics(
    db: Session = Depends(get_db)
):

    students = db.query(
        models.Student
    ).all()

    result = {}

    for student in students:

        result[student.branch] = (
            result.get(
                student.branch,
                0
            ) + 1
        )

    return result

@app.get("/applications")
def get_all_applications(
    db: Session = Depends(get_db)
):

    applications = db.query(
        models.Application
    ).all()

    return applications

@app.get("/dashboard/placement-status")
def placement_status_dashboard(
    db: Session = Depends(get_db)
):

    applications = db.query(
        models.Application
    ).all()

    result = {
        "Applied": 0,
        "Shortlisted": 0,
        "Selected": 0,
        "Rejected": 0
    }

    for app in applications:

        if app.status in result:

            result[app.status] += 1

    return result

@app.get("/my-profile")
def get_my_profile(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):

    token = authorization.replace(
        "Bearer ",
        ""
    )

    payload = verify_token(token)

    username = payload.get("sub")

    user = db.query(
        models.User
    ).filter(
        models.User.username == username
    ).first()

    student = db.query(
        models.Student
    ).filter(
        models.Student.user_id == user.id
    ).first()

    return student

