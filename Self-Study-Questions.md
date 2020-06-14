Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.




Q: Mention two parts of Express that you learned about this week.

A: 
    Express is a web application framework that sits on top of the Node.js web server (http server module). It adds extra functionality, like routing and middleware support, and a simpler API.

    Express makes it easier to create web applications and services. You can serve Single Page Applications (SPAs), build RESTful web services that work with JSON, serve static content, like HTML files, images, audio files, PDFs, and more.




 Q: Describe Middleware?

 A: 
    Middleware provide a way to extend the features provided by the Express framework.They are implemented as small functions that handle one aspect of our application. Tasks like authentication and logging are commonly handled by middleware. Another benefit of Middleware is that it provides an easy way to add modularity to our code. Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. 




 Q: Describe a Resource?

 A: 
    The fundamental concept in any RESTful API is the resource. A resource is an object with a type, associated data, relationships to other resources, and a set of methods that operate on it. It is similar to an object instance in an OOP language but only a few methods are defined for the resource (corresponding to the standard HTTP GET, POST, PUT and DELETE methods), whereas an object instance typically has many methods.





 Q: What can the API return to help clients know if a request was successful?

 A: 
    2xx requests (such as 201, 200, etc.)
    * 2xx: Success = Indicates that the client’s request was accepted successfully.





 Q: How can we partition our application into sub-applications?

 A: 
    After introducing sub-app, we can mount sub-apps onto the main-app, and keep the main-app incredibly clean.
    



    