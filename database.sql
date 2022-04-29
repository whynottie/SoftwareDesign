CREATE TABLE UserCredentials (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE ClientInformation (
  id INTEGER PRIMARY KEY,
  FullName varchar(50) NOT NULL,
  AddressOne varchar(100) NOT NULL,
  AddressTwo varchar(100),
  City varchar(100) NOT NULL,
  State varchar(2) NOT NULL,
  Zipcode varchar(9) NOT NULL
);

CREATE TABLE FuelQuote (
    id INTEGER PRIMARY KEY,
    RequstedGallons INTEGER NOT NULL,
    DeliveryAddress TEXT NOT NULL,
    DeliverDate DATETIME NOT NULL,
    SuggestedPrice Double NOT NULL,
    TotalDue Double NOT NULL
);
