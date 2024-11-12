
import React, {useState} from "react";
import axios from "axios";
import * as Components from "../Components";

const Login = () => {
  const [signIn, toggle] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    fname: "",
    password: "",
    phone: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/users/register", formData);
      console.log("Sign Up successful:", response.data);
      // Handle successful response (e.g., redirect to login or show success message)
  
      // Extract the passphrase from response and display it in an alert or modal
      const passphrase = response.data.passphrase.passphrase; // Adjusted to access the nested passphrase
      alert(`Your passphrase: ${passphrase}`);
    } catch (error) {
      console.error("Sign Up error:", error.response ? error.response.data : error.message);
      // Handle error (e.g., show error message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = (e) => {
        e.preventDefault();
        // Add sign-in logic here
        console.log("Sign In button clicked");
      };

  return (
    <Components.Container>
      <Components.SignUpContainer $signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            name="fname"
            placeholder="Name"
            value={formData.fname}
            onChange={handleChange}
          />
          <Components.Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Components.Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Components.Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer $signinIn={signIn}>
        <Components.Form>
          <Components.Title>Sign In</Components.Title>
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer $signinIn={signIn}>
        <Components.Overlay $signinIn={signIn}>
          <Components.LeftOverlayPanel $signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us, please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel $signinIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Login;

