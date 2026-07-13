CREATE DATABASE online_job_portal_db;
USE online_job_portal_db;

//user tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    fullname VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    phoneNumber VARCHAR(20) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    isVerified BOOLEAN DEFAULT FALSE,

    otp VARCHAR(10),

    otpExpiry DATETIME,

    role ENUM('Student','Recruiter','Admin','User') NOT NULL DEFAULT 'User',

    bio TEXT,

    skills TEXT,

    resume VARCHAR(255),

    companyId INT,

    profilePhoto VARCHAR(255) DEFAULT '',

    termsAcceptedAt DATETIME,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


//company tables
CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    website VARCHAR(255),

    location VARCHAR(255),

    logo VARCHAR(255),

    userId INT NOT NULL,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (userId)
        REFERENCES users(id)
        ON DELETE CASCADE
);

//job tables
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    requirements TEXT,

    salary VARCHAR(50) NOT NULL,

    experienceLevel INT NOT NULL,

    location VARCHAR(255) NOT NULL,

    jobType VARCHAR(50) NOT NULL,

    position INT NOT NULL,

    companyId INT NOT NULL,

    createdBy INT NOT NULL,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (companyId)
        REFERENCES companies(id)
        ON DELETE CASCADE,

    FOREIGN KEY (createdBy)
        REFERENCES users(id)
        ON DELETE CASCADE
);

//application tables
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,

    jobId INT NOT NULL,

    applicantId INT NOT NULL,

    status ENUM('pending', 'accepted', 'rejected')
        DEFAULT 'pending',

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE (jobId, applicantId),

    FOREIGN KEY (jobId)
        REFERENCES jobs(id)
        ON DELETE CASCADE,

    FOREIGN KEY (applicantId)
        REFERENCES users(id)
        ON DELETE CASCADE
);