import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().required(),
});

function ForgotPassword() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch("http://localhost:5000/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    if (obj.status !== 422) {
      alert("Please check your Email to reset the password.");
      reset();
    } else {
      alert("Invalid Email-Id");
    }
  };

  return (
    <div className="container">
      <form method="POST" className="c-align" onSubmit={handleSubmit(onSubmit)}>
        <p className="back" onClick={() => history.goBack()}>
          ➟
        </p>
        <h4>Forgot Password</h4>
        <hr style={{ width: "100%", marginBottom: "0.5rem" }} />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="message">{errors.email && "⚠ Password is required!"}</p>

        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

export default ForgotPassword;
