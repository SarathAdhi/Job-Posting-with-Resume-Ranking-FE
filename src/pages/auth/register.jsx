import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";
import Form from "../../common/components/Form";
import { PageLayout } from "../../common/layouts/PageLayout";
import axios from "../../lib/axios";
import { useStore } from "../../utils/store";
import { uuid } from "../../utils/uuid";

const initialUserValues = {
  name: "",
  email: "",
  password: "",
  isRecruiter: false,
  resume: "",
};

const initialCompanyValues = {
  name: "",
  image: "",
  bio: "",
  website: "",
  location: "",
  size: "",
};

const companySize = ["1-10", "10-20", "20-30", "> 30"];

const RegisterPage = () => {
  const router = useRouter();

  const [userDetails, setUserDetails] = useState(initialUserValues);
  const [companyDetails, setCompanyDetails] = useState(initialCompanyValues);
  const [file, setFile] = useState(null);

  const { user } = useStore();

  const isRecruiterLogin = router.query.isRecruiter === "true";

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!file) return toast.error("Upload your resume");

    const _uuid = v4();

    await axios.post("/auth/register", {
      uuid: _uuid,
      ...userDetails,
      company: !userDetails.isRecruiter
        ? null
        : {
            id: uuid(),
            ...companyDetails,
          },
    });

    let formData = new FormData();
    formData.append("resume", file);
    formData.append("uuid", _uuid);

    await axios.post("/upload/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // router.replace("/auth/login");

    setUserDetails(initialUserValues);
    setCompanyDetails(initialCompanyValues);
  }

  console.log({ userDetails, companyDetails });

  useEffect(() => {
    if (router.isReady && !isRecruiterLogin && user) router.replace("/");

    if (router.isReady)
      setUserDetails({ ...initialUserValues, isRecruiter: isRecruiterLogin });
  }, [router.isReady]);

  const { name, email, isRecruiter, password } = userDetails;
  const { name: c_name, location, size, website, bio, image } = companyDetails;

  return (
    <PageLayout className="flex flex-col gap-4">
      {isRecruiterLogin && <h3>Register as a Recruiter</h3>}

      <Form
        onSubmit={handleFormSubmit}
        handleReset={() => {
          setUserDetails(initialUserValues);
          setCompanyDetails(initialCompanyValues);
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <p className={userDetails.isRecruiter ? "" : "font-bold"}>
            I am Job Seeker
          </p>
          <Switch
            checked={isRecruiter}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                isRecruiter: e.target.checked,
              })
            }
            inputProps={{ "aria-label": "controlled" }}
          />
          <p className={isRecruiter ? "font-bold" : ""}>I am Recruiter</p>
        </Stack>

        <Form.Grid>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={name}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                name: e.target.value,
              })
            }
            required
          />

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

          <Button variant="outlined" component="Resume">
            <input
              type="file"
              name="resume"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </Button>
        </Form.Grid>

        {isRecruiter && (
          <>
            <Divider />
            <h2>About the Company</h2>

            <Form.Grid>
              <TextField
                label="Name"
                variant="outlined"
                name="company"
                value={c_name}
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    name: e.target.value,
                  })
                }
                required
              />

              <TextField
                label="Image"
                variant="outlined"
                name="image"
                value={image}
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    image: e.target.value,
                  })
                }
                required
              />

              <TextField
                label="Location"
                variant="outlined"
                name="company"
                value={location}
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    location: e.target.value,
                  })
                }
                required
              />

              <TextField
                label="Website"
                variant="outlined"
                name="company"
                value={website}
                onChange={(e) =>
                  setCompanyDetails({
                    ...companyDetails,
                    website: e.target.value,
                  })
                }
                required
              />

              <FormControl fullWidth required>
                <InputLabel id="company-size-select-label">Size</InputLabel>

                <Select
                  labelId="company-size-select-label"
                  label="Size"
                  value={size}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      size: e.target.value,
                    })
                  }
                  required
                >
                  {companySize.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Form.Grid>

            <TextField
              label="About Company"
              variant="outlined"
              name="bio"
              value={bio}
              onChange={(e) =>
                setCompanyDetails({
                  ...companyDetails,
                  bio: e.target.value,
                })
              }
              multiline
              rows={5}
              required
            />
          </>
        )}
      </Form>
    </PageLayout>
  );
};

export default RegisterPage;
