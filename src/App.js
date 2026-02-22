import React, { Component } from 'react';
import './App.css';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from 'react-particles-js';
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  detectionMessage: "",
  route: "signin",
  isSignedIn: false,
  user: {
    id: '',
    name: "",
    email: "",
    password: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      detectionMessage: "",
      route: "signin",
      isSignedIn: false,
      user: {
        id: '',
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data &&
      data.outputs &&
      data.outputs[0] &&
      data.outputs[0].data &&
      data.outputs[0].data.regions &&
      data.outputs[0].data.regions[0] &&
      data.outputs[0].data.regions[0].region_info &&
      data.outputs[0].data.regions[0].region_info.bounding_box;

    if (!clarifaiFace) {
      return null;
    }

    const image = document.getElementById("inputImage");
    if (!image) {
      return null;
    }
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value, box: {}, detectionMessage: "" });
  }

  onFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({
        input: reader.result,
        imageUrl: reader.result,
        box: {},
        detectionMessage: ""
      });
    };
    reader.readAsDataURL(file);
  }

  onButtonSubmit = () => {
    if (!this.state.input) {
      this.setState({ detectionMessage: "Please enter an image URL or choose a file first." });
      return;
    }
    this.setState({ imageUrl: this.state.input, box: {}, detectionMessage: "" });
    fetch("https://blitz-brain-backend.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        const box = this.calculateFaceLocation(response);

        if (response) {
          fetch("https://blitz-brain-backend.onrender.com/image", {
            method: "put",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              const nextEntries =
                count && typeof count === "object" ? count.entries : count;

              this.setState((prevState) => ({
                user: {
                  ...prevState.user,
                  entries: nextEntries
                }
              }))
            })
            .catch(console.log)
        }
        if (!box) {
          this.displayFaceBox({});
          this.setState({ detectionMessage: "No face detected in that image. Try another image." });
          return;
        }

        this.displayFaceBox(box)
        this.setState({ detectionMessage: "" });
      })
      .catch(err => {
        console.log(err);
        this.setState({ detectionMessage: "Unable to process that image right now. Please try again." });
      });
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState)
      return;
    }
    else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }
  
  render() {
    const { isSignedIn, imageUrl, route, box, detectionMessage } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={{ particlesOptions }}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home"
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onFileChange={this.onFileChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {detectionMessage && (
              <p className="white f5 mt3 mb2">{detectionMessage}</p>
            )}
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === "signin"
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )

        }
      </div>
    );
  }
}

export default App;
