# Movie-List

Build using ASP.NET Core and React.js with SQL Server Compact for a local database. Source code is available for server under "MovieApp" folder which also includes the DB migration scripts.The client is available under "movieappclient" folder. Final release is present under "FinalBuild" folder. 

# Operations that can be done:
  1. Add Movie.
  2. Edit Movie.
  3. Delete Movie.
  4. Add Actor.
  5. Delete Actor.
  6. Add Producer.
  7. Delete Producer.
  
# Validations
  1. Every movie has the fields; Name, Year of Release, Plot and Poster Image. Each of these fields are mandatory. 
  2. There can't be multiple movies with same name and year of release.
  3. Each movie must have one or more actors.
  4. Each movie must have one and only one producer.
  5. Year of release for every movie must be within the years 1900 to 2050.
  6. Each Actor/Producer has the fields; Name, Sex, Date of Birth and Bio. Each of these fields are mandatory.
  7. There can't be multiple actors with same name. 
  8. There can't be multiple producers with same name.
  9. The actor/producer should be atleast 18 years old.
  10. Each actor/producer can be part of multiple movies.
  11. A actor/producer can't be deleted if he/she is mapped to a movie.
 
 # Installation
  Note: Ensure that you have the latest version of .Net Framework installed.
  1. Extract the MovieApp.rar from FinalBuild folder.
  2. Open a command prompt in the folder.
  3. Run " "C:\Program Files (x86)\dotnet\dotnet.exe" MovieApp.dll " command. If on x64 bit OS then use " "C:\Program     Files\dotnet\dotnet.exe" MovieApp.dll ".
  4. Open a browser and navigate to http://localhost:5000 
