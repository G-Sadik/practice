# myapp: basic frontend project for Tomcat (Maven + Java 21)

## Requirements
- JDK 21
- Maven 3.9.12 (any 3.9.x works)
- Apache Tomcat 9.x (Servlet 4.0). Also runs on Tomcat 10.x/11.x as a static app.

## Structure
pom.xml
src/main/webapp/
  index.html
  css/style.css
  js/app.js
  WEB-INF/web.xml

## Build
    mvn clean package
Output: target/myapp.war
(A prebuilt myapp.war is also included next to this project.)

## Deploy
1. Copy target/myapp.war into TOMCAT_HOME/webapps/
2. Start Tomcat:  TOMCAT_HOME/bin/startup.sh   (Windows: startup.bat)
3. Open http://localhost:8080/myapp/
