step 1 :
install node using brew 
    - brew update
    - brew install node

step 2:
    make sure npm is installed (will be installed along with node)
    - npm --version

step 3:
    - cd into project directory
    - type npm install (to install all the dependencies)

step 4:
    - npm start (to run the project)
    - npm run-script build (to bundle project)


project structure
    - root
        - public
        - src
            - components
            - css
            - data (dummy data)
            - fonts
            - helpers
            - pages (dashboard, auth pages , profile, questionare, responses, user management)
            - scss
            - store (redux store)
            - App.js (Route )
            - index.js
            - routes.js
            - package.json (contains all dependecies details)

