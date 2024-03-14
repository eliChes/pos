import React, { useState } from "react";
import "../styles/login.css";
import posImg from "../../assets/image/posImg.jpg";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../assets/global/url";
import { Button, Modal } from "react-bootstrap";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false); // Show the error message below password input
  const navigate = useNavigate();

  //For Modals
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  //For input field of New password creation
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Show the Code Modal when the email is entered by the user
  const handleForgotPassword = () => {
    setShowCodeModal(true);
    setShowForgotModal(false);
  };

  // Show creation of password modal after the user enter the correct code
  const handleEnterCode = () => {
    setShowCodeModal(false);
    setShowNewPasswordModal(true);
  };

  const handleConfirmPassword = () => {
    setShowNewPasswordModal(false);
    swal({
      text: "Your changes has been successfully saved!",
      icon: "success",
      button: "OK",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "/masterList/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.accessToken);
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/menu");
        } else if (response.status === 202) {
          setError(true);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        swal({
          title: "Something Went Wrong",
          text: "Please contact our support team",
          icon: "error",
        }).then(() => {
          window.location.reload();
        });
      });
  };

  return (
    <>
      <div className="login-container ">
        <div className="details-container">
          <div className="details">
            <h1 className="title">
              <span className="blue">POINT</span>
              <span className="of">OF</span>
              <span className="sale">SALE</span>
            </h1>
            <h2 className="sub-title">
              <span className="blue">with RFID</span>
            </h2>

            <div className="welcome-container">
              <h4>Welcome &#x1F44B;</h4>
              <p>Today is a new day. It's your day. You shape it.</p>
              <p>Sign in to start managing your projects.</p>
            </div>
            <div className="input-container">
              <div className="email-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="input"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={50} // Set the character limit to 50 characters
                  required
                />
              </div>
              <div className="pass-container">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={50} // Set the character limit to 50 characters
                  required
                />
              </div>
              {error ? (
                <div className="error">
                  The username or password you entered is incorrect
                </div>
              ) : null}
              <button className="btn-sign" onClick={handleLogin}>
                Sign in
              </button>

              <p className="forgot" onClick={() => setShowForgotModal(true)}>
                Forgot Password?
              </p>
            </div>
          </div>
        </div>

        <div className="login-img-container h-100">
          <img src={posImg} alt="POS" className="img-pos" />
        </div>
      </div>

      {/* Modals For Forgot Password */}
      <Modal
        show={showForgotModal}
        onHide={() => setShowForgotModal(false)}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Forgot Password</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-modal">
            <p className="modal-p">
              Please Enter your email to verify your account.
            </p>
            <div className="modal-input-container">
              <p>Enter your Email Address:</p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="emailmo@gmail.com"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="modal-btn"
            onClick={() => setShowForgotModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="modal-btn"
            onClick={handleForgotPassword}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for Entering Code */}
      <Modal
        show={showCodeModal}
        onHide={() => setShowCodeModal(false)}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>We'll send you a code to your email</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-modal">
            <p className="modal-p">
              Please check your email for a message with your code.
            </p>
            <div className="modal-input-container">
              <p>Enter Code:</p>
              <div class="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="000000"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <div className="time-remaining">Time Remaining: 3:00</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="modal-btn"
            onClick={() => setShowCodeModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="modal-btn"
            onClick={handleEnterCode}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Creating New Password */}
      <Modal
        show={showNewPasswordModal}
        onHide={() => setShowNewPasswordModal(false)}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Create a New Password</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-modal">
            <p className="modal-p">
              Type and confirm a secure new password for your account.
            </p>
            <div className="modal-input-container">
              <p>New Password:</p>
              <div class="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="*****"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-input-container">
              <p>Confirm New Password:</p>
              <div class="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="*****"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
            {confirmNewPassword.length >= 1 ? (
              <div className="match-status">
                {newPassword === confirmNewPassword ? (
                  <span style={{ color: "green" }}> Password match.</span>
                ) : (
                  <span style={{ color: "red" }}> Password do not match.</span>
                )}
              </div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="modal-btn"
            onClick={() => setShowNewPasswordModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="modal-btn"
            onClick={handleConfirmPassword}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Login;
