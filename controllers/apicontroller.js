const Profile = require('./../profile');
var bodyParser = require('body-parser');

const commonHeaders = {
    "Content-Type": "text/html"
};

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports.api = function(app){

    app.get('/', function(request, response, next){

        response.render('index', {
            hidden: true,
            values: {},
            error: false,
            errorMessage: "",
            search: true
        });
    });

    app.post('/', urlencodedParser, function(request, response){
        var username = request.body.username;
        if (username.length > 0 ){
            var studentProfile = new Profile(username);

            // when successfuly recieved the student profile
            studentProfile.on('end', function(profileJSON){

                var profileValues = {
                    username: profileJSON.profile_name,
                    avatarUrl: profileJSON.gravatar_url,
                    badges: profileJSON.badges.length,
                    javascriptPoints: profileJSON.points.JavaScript
                };

                response.render('index', {
                    hidden: false,
                    values: profileValues,
                    error: false,
                    errorMessage: "",
                    search: false
                });
            });
            
            // when an error occurs
            studentProfile.on('error', function(error){

                response.render('index', {
                    hidden: false,
                    values: {},
                    error: true,
                    errorMessage: error.message,
                    search: true
                });
            });
        }
    });
};