from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str
    role: str


class UserLogin(BaseModel):
    username: str
    password: str


class StudentCreate(BaseModel):
    username: str
    password: str

    name: str
    email: str
    phone: str

    roll_number: str | None = None
    registration_number: str | None = None
    admission_number: str | None = None

    branch: str
    year: int

    section: str | None = None
    batch: str | None = None

    admission_date: str | None = None

    cgpa: float

    photo: str | None = None

class StudentUpdate(BaseModel):

    name: str
    email: str
    phone: str

    roll_number: str | None = None
    registration_number: str | None = None
    admission_number: str | None = None

    branch: str
    year: int

    section: str | None = None
    batch: str | None = None

    admission_date: str | None = None

    cgpa: float

    photo: str | None = None

class AcademicCreate(BaseModel):

    student_id: int

    semester: int

    gpa: float

    backlogs: int

    credits: int

    attendance_percentage: float

    remarks: str


class SportsCreate(BaseModel):
    student_id: int
    sport: str
    achievement: str
    year: int


class PlacementCreate(BaseModel):
    company_name: str
    package: float
    location: str
    deadline: str
    min_cgpa: float
    description: str


class ApplicationCreate(BaseModel):
    student_id: int
    drive_id: int


class StatusUpdate(BaseModel):
    status: str
class PasswordChange(BaseModel):
    username: str
    old_password: str
    new_password: str

class NoticeCreate(BaseModel):
    title: str
    description: str

class AttendanceCreate(BaseModel):

    student_id: int

    subject: str

    attended: int

    total: int

    faculty: str

class FeeCreate(BaseModel):

    student_id: int

    semester: int

    fee_type: str

    total_amount: float

    paid_amount: float

    pending_amount: float

    payment_date: str | None = None
