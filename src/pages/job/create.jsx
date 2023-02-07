import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Form from "../../common/components/Form";
import { PageLayout } from "../../common/layouts/PageLayout";
import axios from "../../lib/axios";
import withAuth from "../../common/hoc/withAuth";
import { useStore } from "../../utils/store";

const initialValues = {
  title: "",
  location: "",
  type: "",
  salary: 0,
  description: "",
  candidates: [],
};

const marks = [
  {
    value: 0,
    label: "0k",
  },
  {
    value: 20,
    label: "20k",
  },
  {
    value: 40,
    label: "40k",
  },
  {
    value: 60,
    label: "60k",
  },
  {
    value: 80,
    label: "80k",
  },
  {
    value: 100,
    label: "100k",
  },
];

const jobTypes = ["Internship", "Full-Time", "Contract"];

const PostJobPage = () => {
  const [jobDetails, setJobDetails] = useState(initialValues);
  const [textAreaRowCount, setTextAreaRowCount] = useState(5);

  const { user } = useStore();

  const { title, location: _location, type, salary } = jobDetails;
  const { id, name } = user.company;

  async function handleFormSubmit(e) {
    e.preventDefault();

    const res = await axios.post("/job/create", {
      ...jobDetails,
      salary: salary === 0 ? 0 : `₹${salary},000`,
      companyId: id,
      owner: user._id,
    });

    console.log({ res });

    setJobDetails(initialValues);
  }

  return (
    <PageLayout>
      <Form onSubmit={handleFormSubmit}>
        <Form.Grid>
          <TextField
            label="Company Id"
            variant="outlined"
            value={id}
            disabled
          />

          <TextField
            label="Company Name"
            variant="outlined"
            value={name}
            disabled
          />

          <TextField
            label="Job Title"
            variant="outlined"
            name="title"
            value={title}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                title: e.target.value,
              })
            }
            required
          />

          <FormControl fullWidth required>
            <InputLabel id="job-type-select-label">Job Type</InputLabel>
            <Select
              labelId="job-type-select-label"
              name="type"
              value={type}
              label="Job Type"
              onChange={(e) =>
                setJobDetails({
                  ...jobDetails,
                  type: e.target.value,
                })
              }
              required
            >
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Job Location"
            name="location"
            variant="outlined"
            value={_location}
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                location: e.target.value,
              })
            }
            required
          />
        </Form.Grid>

        <div className="grid">
          <TextField
            label="Salary"
            variant="outlined"
            name="salary"
            value={`₹ ${salary},000`}
            required
          />

          <div className="px-4">
            <Slider
              getAriaLabel={() => "Salary range"}
              value={salary}
              min={0}
              step={5}
              max={100}
              onChange={(_, e) =>
                setJobDetails({
                  ...jobDetails,
                  salary: e,
                })
              }
              marks={marks}
              valueLabelDisplay="off"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 items-start">
          <div className="flex gap-2">
            <Button
              className="p-0 text-2xl font-semibold !px-2 !min-w-0"
              onClick={() =>
                setTextAreaRowCount((pre) => (pre <= 5 ? 5 : pre - 1))
              }
            >
              -
            </Button>
            <Button
              className="p-0 text-lg !px-2 !min-w-0"
              onClick={() => setTextAreaRowCount((pre) => pre + 1)}
            >
              +
            </Button>
          </div>

          <TextField
            label="Job Description"
            className="w-full"
            name="description"
            rows={textAreaRowCount}
            multiline
            onChange={(e) =>
              setJobDetails({
                ...jobDetails,
                description: e.target.value,
              })
            }
          />
        </div>
      </Form>
    </PageLayout>
  );
};

export default withAuth(true)(PostJobPage);
