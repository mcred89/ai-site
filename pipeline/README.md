# js-power-site CI/CD

1. Make github personal token
    - Log into GitHub
    - User Icon -> Settings -> Personal access tokens -> Generate new token
    - Enter whatever for the Token description
    - Select 'public_repo' under the 'repo' section
2. Enter token into AWS secrets manager as a string
    - CodepipeGitHubToken is the default name, but you can name it whatever
3. Deploy pipeline template twice, filling in your github info and choices for either dev or prod.