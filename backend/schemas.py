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
    branch: str
    year: int
    cgpa: float

class AcademicCreate(BaseModel):
    student_id: int
    semester: int
    gpa: float
    backlogs: int


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

class FeeCreate(BaseModel):
    student_id: int
    semester: int
    fee_type: str
    amount: float