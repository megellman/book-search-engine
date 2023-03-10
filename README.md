# Book Search Engine
![license badge](https://img.shields.io/static/v1?label=license&message=MIT&color=blue)

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| React   | [reactjs.org](https://reactjs.org/docs/getting-started.html) |      |   
| Git | [git-scm.com](https://git-scm.com/)     |    
| Apollo | [https://www.apollographql.com](https://www.apollographql.com/docs/) |
| Node.js | [nodejs.org/docs](https://nodejs.org/docs/latest-v16.x/api/) |
| GraphQL | [https://graphql.org/](https://graphql.org/) |
| Mongoose | [https://mongoosejs.com/docs/schematypes.html](https://mongoosejs.com/docs/schematypes.html)|
    
## Description

[Visit the Deployed Site](https://megellman.github.io/react-portfolio/)
    
This project is my professional portfolio. It contains an about me section, links to my work, a contact form, and a downloadable resume. 

I created this project using React, Bootstrap, and JavaScript. One motivation for creating this project was to get more experience working with React. Another was to create a portfolio that could easily be updated as I build out my projects section. 

## Table of Contents
* [Code Example](#code-example)
* [Usage](#usage)
* [Author Info](#author-info)
* [Credits](#credits)
* [License](#license)

```
{projects.map(item => (
                <div className="col">
                    <div className="card" style={{ width: '30rem' }} key={item.id}>
                        <a href={item.deployedLink} >
                            <img src={item.image} style={{ width: '30rem', height: '15rem' }} className="card-img-top img-fluid" alt="..." />
                        </a>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <a href={item.repoLink} className="btn btn-primary">GitHub Repository</a>
                            </div>
                    </div>
                </div>

            ))}
```

## Code Example
To render each project card, I created an array of objects for each project. Within each object is a title, description, image source, and links to deployed and GitHub repository. Instead of rendering each individual page, I passed the array into this component as a prop and mapped the array. Each array item will be created with these card design specifications. This code makes it incredibly easy to add new projects to this application.  
  
## Usage
  
This project can be used as a professional portfolio.


## Author Info

### Megan Ellman

[LinkedIn](https://www.linkedin.com/in/megan-ellman/)

[GitHub](https://github.com/megellman)

[Portfolio](https://megellman.github.io/portfolio/)
      
## License
  
  This project is covered under the MIT license. For more information please click [here](https://choosealicense.com/)

## Questions

[GitHub](github.com/megellman)

If you have any additional questions, you can reach me at meganlellman@gmail.com
