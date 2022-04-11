import React from "react";
import { Link } from "react-router-dom";
import authWrapper from "../helper/authWrapper";

var projects = [1, 2, 3];

const Dashboard = () => {
  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
      <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2">
        {projects.map((data, i) => (
          <div className="card relative overflow-hidden my-4" key={i}>
            <div className="ribbon bg-emerald-500">Popular</div>
            <Link to={`/project-details/${i}`} className="font-sans text-xl text-gray font-semibold hover:text-sky-500 hover:cursor-pointer">
              Project title
            </Link>
            <p className="font-sans text-sm text-stone-800 tracking-tight">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <div className="flex flex-col lg:flex-row">
              <div className="inner-card my-6 w-full lg:w-2/5">
                <p className="text-md font-bold font-sans text-gray">Targeted contribution</p>
                <p className="text-sm font-bold font-sans text-gray-600 ">100000 ETH </p>
                <p className="text-md font-bold font-sans text-gray">Deadline</p>
                <p className="text-sm font-bold font-sans text-gray-600 ">2022-06-17 10:15 PM</p>
              </div>
              <div className="inner-card my-6 w-full lg:w-3/5">
                <label className="text-sm text-gray-700 font-semibold">Contribution amount :</label>
                <div className="flex flex-row">
                  <input type="number" placeholder="Type here" className="input rounded-l-md" />
                  <button className="button">Contribute</button>
                </div>
                <p className="text-sm text-red-600"> <span className="font-bold">NOTE : </span> Minimum contribution is 2 ETH </p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full">
              <div className="progress" style={{ width: "25%" }}> 25% </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card lg:w-5/12 h-fit my-4">
          <h1 className="font-sans font-bold text-xl">Start a fund riser fot free</h1>
          <form>
            <div className="form-control my-1">
              <label className="text-sm text-gray-700">Title :</label>
              <input type="text" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" />
            </div>
            <div className="form-control my-1">
              <label className="text-sm text-gray-700">Description :</label>
              <textarea placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" ></textarea>
            </div>
            <div className="form-control my-1">
              <label className="text-sm text-gray-700">Targeted contribution amount :</label>
              <input type="number" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" />
            </div>
            <div className="form-control my-1">
              <label className="text-sm text-gray-700">Minimum contribution amount :</label>
              <input type="number" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" />
            </div>
            <div className="form-control my-1">
              <label className="text-sm text-gray-700">Deadline :</label>
              <input type="date" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" />
            </div>

            <button className="p-2 w-full bg-[#F56D91] text-white rounded-md hover:bg-[#d15677]" disabled>Contribute</button>
          </form>
      </div>
    </div>
  );
};

export default authWrapper(Dashboard);
