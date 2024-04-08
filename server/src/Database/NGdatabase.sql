CREATE DATABASE NGdatabase
USE NGdatabase

CREATE TABLE Admin(
    AdminID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    NationalID VARCHAR(255),
    County VARCHAR(255),
    Residence VARCHAR(255),
    PhoneNumber VARCHAR(255),
    Gender VARCHAR(255),
    DateOfBirth VARCHAR(255),
    PhotoURL VARCHAR(255),
    Role VARCHAR(255),
);

SELECT * FROM Admin
DROP TABLE Admin

CREATE TABLE Users(
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    NationalID VARCHAR(255),
    County VARCHAR(255),
    Residence VARCHAR(255),
    PhoneNumber VARCHAR(255),
    Occupation VARCHAR(255),
    Gender VARCHAR(255),
    DateOfBirth VARCHAR(255),
    PhotoURL VARCHAR(255),
    Role VARCHAR(255),
);

SELECT * FROM Users
DROP TABLE Users

CREATE TABLE Reports(
    ReportID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Location VARCHAR(255),
    TimeOfReporting TIME,
    Type VARCHAR(255),
    Description VARCHAR(255),
    NoiseLevel VARCHAR(255),
    SourceOfNoise VARCHAR(255),
    DurationOfNoise VARCHAR(255),
    SupportingDocuments VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);


SELECT * FROM Reports
DROP TABLE Reports

CREATE TABLE Feedback(
    FeedBackID INT IDENTITY(1,1) PRIMARY KEY,
    AdminID INT NOT NULL,
    UserID INT NOT NULL,
    Date VARCHAR(255),
    Message VARCHAR(255)
    FOREIGN KEY (AdminID) REFERENCES Admin(AdminID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

SELECT * FROM Feedback
DROP TABLE Feedback

CREATE TABLE Notifications(
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    AdminID INT NOT NULL,
    Type VARCHAR(255),
    Date VARCHAR(255),
    Status VARCHAR(255),
    Description VARCHAR(255),
    FOREIGN KEY (AdminID) REFERENCES Admin(AdminID) ON DELETE CASCADE,
);

SELECT * FROM Notifications
DROP TABLE Notifications

CREATE TABLE Emails(
    EmailID INT IDENTITY(1,1) PRIMARY KEY,
    AdminID INT NOT NULL,
    UserID INT NOT NULL,
    Date VARCHAR(255),
    Subject VARCHAR(255),
    Email VARCHAR(255),

    FOREIGN KEY (AdminID) REFERENCES Admin(AdminID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

SELECT * FROM Emails
DROP TABLE Emails

