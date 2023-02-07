import { useState } from "react";
import withAuth from "../../common/hoc/withAuth";
import { PageLayout } from "../../common/layouts/PageLayout";
import axios from "../../lib/axios";

const JobSuggestionsPage = () => {
  const [file, setFile] = useState(null);
  const [suggestedJobs, setSuggestedJobs] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("userfile", file);

    const res = await axios.post("/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const companies = Object.values(res.Company);
    const locations = Object.values(res.Location);
    const positions = Object.values(res.Position);
    const id = Object.values(res.index);

    const data = companies.map((company, i) => ({
      id: id[i],
      company,
      location: locations[i].replace(/[^a-zA-Z ]/g, "").replaceAll(" ", ""),
      position: positions[i],
    }));

    setSuggestedJobs(data);
  }

  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="userfile"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        {suggestedJobs.map((job, index) => (
          <div key={index}>
            <h3>{job.company}</h3>
            <h6>{job.position}</h6>
            <p>{job.location}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default withAuth()(JobSuggestionsPage);
