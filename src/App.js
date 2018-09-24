// Import modules
import React, {Component} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// Import apiKey from .config file
import apiKey from './.config.js';

// Import components
import Header from './components/header.js';
import Gallery from './components/gallery.js';
import NotFound from './components/notfound.js';


// This class contains all state for this project
class App extends Component {
// State for this project
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true,
      searchText: ''
    };
  }
// This lifecycle method calls the performSearch function, and it checks the URL
// upon refresh in order to refresh the page with the UI in sync with the URL.
  componentDidMount() {
    const path = this.props.location.pathname;
    const homeTest = /^\/$/.test(path);
    const catTest = /^\/cats$/.test(path);
    const dogTest = /^\/dogs$/.test(path);
    const computerTest = /^\/computers$/.test(path);
    const searchTest = /^\/search\/./.test(path);
    if (catTest|dogTest|computerTest) {
      this.performSearch((this.props.location.pathname).slice(1));
    } else if (searchTest) {
      this.performSearch((this.props.location.pathname).slice(8));
    } else if (homeTest) {
      this.performSearch('cats');
    }
  }

// This function fetches the data from Flickr using the apiKey provided in the .config file.
  performSearch = (query) => {
    this.setState({
      loading: true
    });
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          photos: response.photos.photo,
          loading: false,
          searchText: query
        });
      })
      .catch(error => {
        console.log('Error fetching data.', error);
      });
  }

// This function updates the state when there is input in the input box.
  onSearchChange = e => {
    this.setState({searchText: e.target.value});
  }

// This function calls performSearch upon form submission and updates the URL.
  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.searchText}`);
    this.performSearch(this.state.searchText);
    e.currentTarget.reset();
  }

// Renders the Header and Route paths and passes props to components.
  render() {
    return (
      <div className="container">
        <Header onSearch={this.onSearchChange} onSubmit={this.handleSubmit} search={this.performSearch} />
        <div className="photo-container">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cats"/>} />
            <Route exact path="/cats" render={() => <Gallery data={this.state.photos} loading={this.state.loading} criteria={'cats'} />} />
            <Route exact path="/dogs" render={() => <Gallery data={this.state.photos} loading={this.state.loading} criteria={'dogs'} />} />
            <Route exact path="/computers" render={() => <Gallery data={this.state.photos} loading={this.state.loading} criteria={'computers'} />} />
            <Route path="/search/:criteria" render={() => <Gallery data={this.state.photos} loading={this.state.loading} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);



/*
================================================================================
Build your app components
================================================================================

Use the index.html file and mockups as a general guide while you create the*****************
components of this project.

Use the src/App.js file as your main container component, where you should**********************
import your .config file.

Keep and manage as much of the state and functionality as possible in your**************************
src/App.js file, and pass data down to reusable stateless components with props.

Create the necessary stateless functional components that focus on the UI and*****************
receive data via props. Some examples of the stateless components you could use
for your app are:
1. A Header component that could store things like an app title, logo, nav and*******************
   search bar. Remember, the mockups and index.html file are a guide for how the
   main components should be laid out, arranged, and positioned, but you can
   personalize your app by adding things like a tittle, logo, footer, etc..
2. A Nav component for the navigation menu******************************************************
3. A single Gallery component that can be reused to display the sets of images******************
   for each of the three topic categories you wish to display, like sunsets,
   waterfalls and rainbows, for example.
4. A single Gallery-item component that can be reused with iteration to display********************
   each list item and image.
5. Create a form component for the search. Since forms deal with a significant*******************
   amount of unique information that can be very specific to the particular form
   being used, a stateless component might not be the best option. So feel free
   to manage the form-specific state in the form component rather than trying to
   keep you form stateless.

Pro Tip: When building out your components, if you're feeling stuck, it can be
helpful to follow along with a course in the unit, pausing the videos as needed
so you can build alongside the instructor, but instead of building the course
project, try to apply what's in the video to this project.
--------------------------------------------------------------------------------


================================================================================
Get a Flickr API key
================================================================================

Create yahoo account/use tumblr account to sign in.***************************************************

Apply for a non-commercial API key.*******************************************************************

You’ll need to set up a .config.js file in your project that imports your API*************************
key into your application so that you and other users can request data from the
Flickr API. This should be imported into src/App.js.

The config.js file should look something like this:***************************************************
1. const apiKey = 'YOUR API KEY';
2. export default apiKey;

Import your API key into your application, preferably into src/App.js, and save***********************
it to a variable like you would any other module, and use the variable where
applicable. That way, your app’s users will only need to enter in an API key
once.

Important Note: This config.js file must be listed in the .gitignore file so it
won’t be committed to your github repository. This will prevent your keys and
tokens from getting posted publicly to GitHub. It is very important that you do
NOT upload any of your personal API keys / secrets / passwords to Github or
other publicly accessible place. When you submit this project for grading, your
project reviewer will create their own config.js file and use their own API key
to run the project.
--------------------------------------------------------------------------------


================================================================================
Routes
================================================================================

Install React Router and set up your <Route> and <Link> or <NavLink> components.******************

Include a "Search" link that includes a search field to let users search for**********************
photos.

Clicking a nav link should navigate the user to the correct route, displaying********************
the appropriate info.

The current route should be reflected in the URL.**************************************************

Your app should display at least 3 default topic links that return a list of***********************
photos matching some criteria. For example: sunsets, waterfalls and rainbows.

It's okay to request and load the photos for the three default topics when the*********************
app first loads. Those default topic pages don't have to re-request and reload
new data every time one of those pages are loaded.

Pro Tip: When setting up the routes, if you're feeling stuck, it can be helpful
to follow along with a course in the unit that covers routes, pausing the videos
as needed so you can build alongside the instructor, but instead of building the
course project, try to apply what's in the video to this project.
--------------------------------------------------------------------------------


================================================================================
Requesting the data
================================================================================

Fetch the data from the Flickr API using the Fetch API or a tool like Axios.***************

Make sure data fetching and state is managed by a higher-level “container”******************
component, like src/App.js.

It is recommended the you use the following link for help with this part of the***************
project, https://www.flickr.com/services/api/explore/flickr.photos.search.

Enter a tag to search for, such as “sunsets.”***********************************************

You should also limit the number of results to 24 using the per_page argument.*****************

Choose JSON as the output, then “Do not sign call.”***************************************

Click “Call Method...” At the bottom of the page, and you’ll see an example of******************
the API call you’ll need to make. You can click on the URL to see what the
response will look like.

Pro Tip: When requesting data from the API, if you're feeling stuck, it can be
helpful to follow along with a course in the unit that covers fetching data,
pausing the videos as needed so you can build alongside the instructor, but
instead of building the course project, try to apply what's in the video to this
project.
--------------------------------------------------------------------------------


================================================================================
Search
================================================================================

Be sure to include a search field feature and a search route to search for new************************
categories of images.
--------------------------------------------------------------------------------


================================================================================
Displaying the data
================================================================================

Make sure each image gets a unique "key" prop.***********************************************

There should be no console warnings regarding unique "key" props.******************************

The title of each page displaying images should be dynamically provided via********************
"props".

The current route should be reflected in the URL.*********************************************

There should be no more that 24 images displayed.***********************************************
--------------------------------------------------------------------------------


================================================================================
CSS styles
================================================================================

The mockups are just a general guide for how the elements should be arranged and
positioned on the page. But other than general arrangement, spacing and
positioning, you are free to experiment with things like color, background
color, font, shadows, transitions, animations, etc..
--------------------------------------------------------------------------------


Add good code comments
Cross-Browser consistency


================================================================================
Extra Credit
================================================================================

Add a loading indicator that displays each time the app fetches new data. Since***************************
the data for the three main topic pages can be requested when the page first
loads, it's okay if the loading indicator is only present on the search route.

If no matches are found by the search, display a friendly user message to tell*****************************
the user there are no matches.

Include a 404-like error route that displays a friendly 404 error page when a
URL does not match an existing route.
*/
