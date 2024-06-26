# NGdatabase Schema

## Admin Table
- AdminID VARCHAR(255) PRIMARY KEY
- FirstName VARCHAR(255) NOT NULL
- LastNmae VARCHAR(255) NOT NULL
- Email VARCHAR(255) NOT NULL
- Password VARCHAR(255) NOT NULL
- NationalID VARCHAR(255)
- County VARCHAR(255)
- Residence VARCHAR(255)
- PhoneNumber VARCHAR(255)
- Gender VARCHAR(255)
- DateOfBirth VARCHAR(255)
- PhotoURL VARCHAR(255)

## Users Table
- UserID VARCHAR(255) PRIMARY KEY
- FirstName VARCHAR(255) NOT NULL
- LastNmae VARCHAR(255) NOT NULL
- Email VARCHAR(255) NOT NULL
- Password VARCHAR(255) NOT NULL
- NationalID VARCHAR(255)
- County VARCHAR(255)
- Residence VARCHAR(255)
- PhoneNumber VARCHAR(255)
- Occupation VARCHAR(255)
- Gender VARCHAR(255)
- DateOfBirth VARCHAR(255)
- PhotoURL VARCHAR(255)

## Reports Table
- ReportID VARCHAR(255) PRIMARY KEY
- UserID VARCHAR(255) NOT NULL
- Location VARCHAR(255)
- TimeOfObservation VARCHAR(255)
- Type VARCHAR(255)
- Description VARCHAR(255)
- NoiseLevel VARCHAR(255)
- SourceOfNoise VARCHAR(255)
- DurationOfNoise VARCHAR(255)
- SupportingDocuments VARCHAR(255)
- FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE

## Feedback Table
- FeedBackID VARCHAR(255) PRIMARY KEY
- AdminID VARCHAR(255) NOT NULL
- UserID VARCHAR(255) NOT NULL
- Date VARCHAR(255)
- Message VARCHAR(255)
- FOREIGN KEY (AdminID) REFERENCES Admin(AdminID) ON DELETE CASCADE
- FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE

## Notifications Table
- NotificationID VARCHAR(255) PRIMARY KEY
- AdminID VARCHAR(255) NOT NULL
- UserID VARCHAR(255) NOT NULL
- Type VARCHAR(255)
- Date VARCHAR(255)
- Staus VARCHAR(255)
- Description VARCHAR(255)
- FOREIGN KEY (AdminID) REFERENCES Admin(AdminID) ON DELETE CASCADE
- FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE

## Emails Table
- EmailID VARCHAR(255) PRIMARY KEY
- AdminID VARCHAR(255) NOT NULL
- UserID VARCHAR(255) NOT NULL
- Date VARCHAR(255)
- Subject VARCHAR(255)
- Email VARCHAR(255)
- FOREIGN KEY (AdminID) REFERENCES Admin(AdminID) ON DELETE CASCADE
- FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
