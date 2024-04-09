import React, { useState } from "react";
import userImage from "../../assets/Ellipse 2.png";
import { useReportIncidentMutation } from "../../Features/userfeatures/User";
import "./Report.scss";

const Report = () => {
  const id = localStorage.getItem("UserID");
  const FirstName = localStorage.getItem("FirstName");
  const LastName = localStorage.getItem("LastName");
  const UserID = localStorage.getItem("UserID");
  const Residence = localStorage.getItem("Residence");
  const PhoneNumber = localStorage.getItem("PhoneNumber");

  const [createReport] = useReportIncidentMutation();
  const [Location, setLocation] = useState("");
  const [Type, setType] = useState("");
  const [Description, setDescription] = useState("");
  const [NoiseLevel, setNoiseLevel] = useState("");
  const [SourceOfNoise, setSourceOfNoise] = useState("");
  const [DurationOfNoise, setDurationOfNoise] = useState("");
  const [SupportingDocuments, setSupportingDocuments] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReport({
        id,
        Location,
        Type,
        Description,
        NoiseLevel,
        SourceOfNoise,
        DurationOfNoise,
        SupportingDocuments,
      });
      setLocation("");
      setType("");
      setDescription("");
      setNoiseLevel("");
      setSourceOfNoise("");
      setDurationOfNoise("");
      setSupportingDocuments("");
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  return (
    <div className="Report">
      <div className="user-details">
        <img src={userImage} alt="" />
        <p className="names">
          {FirstName} {LastName}{" "}
        </p>
        <p>ID:#{UserID}</p>
        <p>Residence: {Residence}</p>
        <p>Contact: {PhoneNumber}</p>
      </div>
      <div className="Report-form">
        <p className="notice">
          "Important Notice: False alarms may result in severe penalties from
          authorities. Exercise caution when issuing warnings. Your cooperation
          is appreciated."
        </p>
        <form onSubmit={handleSubmit}>
          <div className="label-left">
            <label>
              Location:
              <input
                type="text"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                value={Type}
                onChange={(e) => setType(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Noise Level:
              <input
                type="text"
                value={NoiseLevel}
                onChange={(e) => setNoiseLevel(e.target.value)}
              />
            </label>
          </div>

          <div className="label-right">
            <label>
              Source Of Noise:
              <input
                type="text"
                value={SourceOfNoise}
                onChange={(e) => setSourceOfNoise(e.target.value)}
              />
            </label>
            <label>
              Duration Of Noise:
              <input
                type="text"
                value={DurationOfNoise}
                onChange={(e) => setDurationOfNoise(e.target.value)}
              />
            </label>
            <label>
              Supporting Documents:
              <input
                type="file"
                onChange={(e) => setSupportingDocuments(e.target.files[0])}
              />
            </label>
          </div>
        </form>
        <button className="submit-report" type="submit" onClick={handleSubmit} >Submit Report</button>

      </div>
    </div>
  );
};

export default Report;
