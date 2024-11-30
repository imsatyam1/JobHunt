import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs, { unlinkSync } from "fs";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required!",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company register successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(401).json({
        message: "Compies not found",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatedCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;

    const company = await Company.findById(req.params.id);
    const companyLogo = company?.logo;

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    let logo;

    if (file) {
      console.log("File received:", file);

      try {
        const cloudResponse = await cloudinary.uploader.upload(file.path);
        console.log("Cloudinary response:", cloudResponse);

        fs.unlinkSync(file.path); // Remove local file
        logo = cloudResponse.secure_url;
        console.log("Logo URL:", logo);

        if (companyLogo) {
          const regex = /upload\/(?:v\d+\/)?([^\.]+)/;
          const match = companyLogo.match(regex);
          if (match) {
            await cloudinary.uploader.destroy(match[0]);
          } else {
            console.warn("No match found for companyLogo");
          }
        } else {
          console.warn("companyLogo is undefined");
        }
      } catch (error) {
        console.error("Error occurred:", error.message);
        return error;
      }
    }

    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;
    if (logo) company.logo = logo;

    await company.save();

    return res.status(200).json({
      message: "Company information updates.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
