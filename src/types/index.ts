export interface Company {
  _id: string;
  name: string;
  description: string;
  website: string;
  location: string;
  logo: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceYears: number;
  location: string;
  company: Company;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Application {
  _id: string;
  job: string;
  applicant: User;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profile: Profile;
}

export interface Profile {
  bio: string;
  skills: any[];
  resume: string;
  resumeName: string;
  profilePhoto: string;
}
