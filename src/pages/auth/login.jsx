import { TextField } from "@mui/material";
import React, { useState } from "react";
import Form from "../../common/components/Form";
import withOutAuth from "../../common/hoc/withoutAuth";

import { PageLayout } from "../../common/layouts/PageLayout";
import axios from "../../lib/axios";
import { useStore } from "../../utils/store";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState(initialValues);
  const { getProfile } = useStore();

  async function handleFormSubmit(e) {
    e.preventDefault();

    const res = await axios.post("/auth/login", userDetails);

    if (res?.token) localStorage.setItem("token", res.token);
    getProfile();

    setUserDetails(initialValues);
  }

  const { email, password } = userDetails;

  return (
    <PageLayout>
      <Form
        onSubmit={handleFormSubmit}
        handleReset={() => setUserDetails(initialValues)}
      >
        <Form.Grid>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                email: e.target.value,
              })
            }
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              })
            }
            required
          />
        </Form.Grid>
      </Form>
    </PageLayout>
  );
};

export default withOutAuth(LoginPage);
