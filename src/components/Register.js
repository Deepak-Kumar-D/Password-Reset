import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(6, "⚠ Minimum 6 characters!").required(),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

function Register() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch(
      "https://react-password-reset.netlify.app/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );

    const reg = await obj.json();

    if (reg) {
      alert(reg.message);
      reset();
      history.push("/");
    } else {
      alert(reg.error);
    }
  };
  return (
    <div className="container">
      <form method="POST" className="c-align" onSubmit={handleSubmit(onSubmit)}>
        <p className="back" onClick={() => history.goBack()}>
          ➟
        </p>
        <h4>Register</h4>
        <hr style={{ width: "100%", marginBottom: "0.5rem" }} />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="message">{errors.email && "⚠ Email-Id is required!"}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register("password")}
        />
        <p className="message">
          {errors.password && "⚠ Password is required!"}
        </p>

        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm Password"
          {...register("cpassword")}
        />
        <p className="message">
          {errors.cpassword && "⚠ Confirm the password!"}
        </p>

        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
}

export default Register;
