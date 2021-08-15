import { useHistory, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  password: yup.string().min(6, "⚠ Minimum 6 characters!").required(),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required(),
});

function ResetPassword() {
  const history = useHistory();
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const obj = await fetch(
      `https://react-password-reset.netlify.app/resetpassword/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
        }),
      }
    );

    const newPassword = await obj.json();

    if (newPassword) {
      alert(newPassword.message);
      reset();
      history.push("/");
    } else {
      alert(newPassword.error);
    }
  };
  return (
    <div className="container">
      <form method="POST" className="c-align" onSubmit={handleSubmit(onSubmit)}>
        <p className="back" onClick={() => history.goBack()}>
          ➟
        </p>
        <h4>Reset Password</h4>
        <hr style={{ width: "100%", marginBottom: "0.5rem" }} />

        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          {...register("password")}
        />
        <p className="message">
          {errors.password && "⚠ Password is required!"}
        </p>

        <label htmlFor="cpassword">Confirm New Password</label>
        <input
          type="password"
          name="cpassword"
          placeholder="Confirm New Password"
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

export default ResetPassword;
