

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type SchoolLevel = "PRIMARY" | "SECONDARY";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type ExamType = "QUIZ" | "MIDTERM" | "FINAL" | "PRACTICAL" | "OTHER";

export type AttemptStatus = "PRESENT" | "ABSENT" | "EXCUSED";

/** Prisma Decimal values (API side) */
export type DecimalLike = number | string;

//    SCHOOL


export interface ICreateSchool {
  name: string;
  address?: string;
  level: SchoolLevel;
}

export interface IUpdateSchool {
  name?: string;
  address?: string;
  level?: SchoolLevel;
}


//    USER (BASE)


export interface ICreateUser {
  schoolId: number;
  username: string;
  email: string;
  phone?: string;
  role: UserRole;
  image?: string;

  // profile fields (depending on role)
  fullName?: string;
  gender?: Gender;

  // student only
  classId?: number;
  admissionNo?: string;
}

export interface IUpdateUser {
  username?: string;
  email?: string;
  phone?: string ;
  role?: UserRole;
  image?: string ;

  failedAttempts?: number;
  lockUntil?: string ; // ISO
}

//    TEACHER


export interface ICreateTeacher {
  schoolId: number;
  userId: number;
  fullName: string;
  gender?: Gender;
}

export interface IUpdateTeacher {
  fullName?: string;
  gender?: Gender ;
}


//    STUDENT


export interface ICreateStudent {
  schoolId: number;
  userId: number;
  classId: number;
  fullName: string;
  gender?: Gender;
  admissionNo: string;
}

export interface IUpdateStudent {
  classId?: number;
  fullName?: string;
  gender?: Gender;
  admissionNo?: string;
}


//    GRADE


export interface ICreateGrade {
  schoolId: number;
  name: string;
  sortOrder?: number;
}

export interface IUpdateGrade {
  name?: string;
  sortOrder?: number;
}


//    CLASS ROOM


export interface ICreateClassRoom {
  schoolId: number;
  gradeId: number;
  name: string;
  sortOrder?: number;
}

export interface IUpdateClassRoom {
  gradeId?: number;
  name?: string;
  sortOrder?: number;
}


//    SUBJECT


export interface ICreateSubject {
  schoolId: number;
  name: string;
  passMark?: DecimalLike; // default 50.00
  fullMark?: DecimalLike; // default 100.00
}

export interface IUpdateSubject {
  name?: string;
  passMark?: DecimalLike;
  fullMark?: DecimalLike;
}


//    ACADEMIC YEAR


export interface ICreateAcademicYear {
  schoolId: number;
  name: string;
  startDate: string; // ISO DateTime
  endDate: string;   // ISO DateTime
  isActive?: boolean;
}

export interface IUpdateAcademicYear {
  name?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}


//    TERM


export interface ICreateTerm {
  schoolId: number;
  yearId: number;
  name: string;
  startDate: string; // ISO DateTime
  endDate: string;   // ISO DateTime
  sortOrder?: number; // default 1
  isActive?: boolean;
}

export interface IUpdateTerm {
  name?: string;
  startDate?: string;
  endDate?: string;
  sortOrder?: number;
  isActive?: boolean;
}


//    EXAM


export interface ICreateExamItem {
  classId: number;
  subjectId: number;
  fullMark?: DecimalLike; // default 100.00
  passMark?: DecimalLike; // default 50.00
}

export interface ICreateExam {
  schoolId: number;
  yearId: number;
  termId?: number | null;
  type: ExamType;
  name: string;
  examDate?: string | null; // ISO DateTime
  items: ICreateExamItem[];
}

export interface IUpdateExam {
  yearId?: number;
  termId?: number | null;
  type?: ExamType;
  name?: string;
  examDate?: string | null;
}


//    EXAM ITEM (optional update)


export interface IUpdateExamItem {
  fullMark?: DecimalLike;
  passMark?: DecimalLike;
}


//    EXAM ATTEMPT


export interface ICreateExamAttempt {
  examId: number;
  studentId: number;
  attemptNo?: number;       // default 1
  status?: AttemptStatus;   // default PRESENT
  takenAt?: string;         // ISO DateTime (optional)
}

export interface IUpdateExamAttempt {
  attemptNo?: number;
  status?: AttemptStatus;
  takenAt?: string;
}

//    EXAM RESULT


export interface ISubmitExamResultRow {
  studentId: number;
  examItemId: number;
  subjectId: number;
  score: DecimalLike;
  fullMark?: DecimalLike;     // optional (you can take from ExamItem)
  percentage?: DecimalLike;   // optional (you can compute)
  gradeLetter?: string;
  isPass?: boolean;           // optional (you can compute)
  remark?: string;
}

export interface ISubmitResultsBulk {
  schoolId: number;
  examId: number;
  classId: number;
  results: ISubmitExamResultRow[];
}


//    STUDENT EXAM SUMMARY


export interface IRecomputeSummaryPayload {
  examId: number;
  classId: number;
  schoolId: number;
}


//    FILTERS (OPTIONAL)


export interface IClassFilter {
  schoolId: number;
  gradeId?: number;
}

export interface IExamFilter {
  schoolId: number;
  yearId?: number;
  termId?: number;
  type?: ExamType;
}

export interface IStudentFilter {
  schoolId: number;
  classId?: number;
  admissionNo?: string;
}
