from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base
from sqlalchemy import Boolean

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    role = Column(String)

    must_change_password = Column(
        Boolean,
        default=True
    )
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    # --------------------------
    # Personal Details
    # --------------------------

    photo = Column(String, nullable=True)

    name = Column(String)

    gender = Column(String, nullable=True)

    dob = Column(String, nullable=True)

    blood_group = Column(String, nullable=True)

    email = Column(String)

    phone = Column(String)

    address = Column(String, nullable=True)

    city = Column(String, nullable=True)

    state = Column(String, nullable=True)

    pincode = Column(String, nullable=True)

    # --------------------------
    # Parent Details
    # --------------------------

    father_name = Column(String, nullable=True)

    mother_name = Column(String, nullable=True)

    parent_phone = Column(String, nullable=True)

    # --------------------------
    # College Details
    # --------------------------

    roll_number = Column(String, unique=True, nullable=True)

    registration_number = Column(String, unique=True, nullable=True)

    admission_number = Column(String, unique=True, nullable=True)

    branch = Column(String)

    section = Column(String, nullable=True)

    batch = Column(String, nullable=True)

    year = Column(Integer)

    admission_date = Column(String, nullable=True)

    current_semester = Column(Integer, default=1)

    cgpa = Column(Float, default=0)

class AcademicRecord(Base):
    __tablename__ = "academic_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))

    semester = Column(Integer)

    gpa = Column(Float)
    backlogs = Column(Integer)

    credits = Column(Integer, default=0)
    attendance_percentage = Column(Float, default=0)
    remarks = Column(String, nullable=True)

class SportsRecord(Base):
    __tablename__ = "sports_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    sport = Column(String)
    achievement = Column(String)
    year = Column(Integer)


class PlacementDrive(Base):
    __tablename__ = "placement_drives"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String)
    package = Column(Float)
    location = Column(String)
    deadline = Column(String)
    min_cgpa = Column(Float)
    description = Column(String)


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    drive_id = Column(Integer, ForeignKey("placement_drives.id"))
    status = Column(String)

class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    created_at = Column(String)



class Fee(Base):
    __tablename__ = "fees"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer)

    semester = Column(Integer)

    fee_type = Column(String)

    total_amount = Column(Float)
    paid_amount = Column(Float, default=0)
    pending_amount = Column(Float, default=0)

    payment_date = Column(String, nullable=True)

    status = Column(String)