import cardMessage from "../models/card.js";
import operationModel from "../models/operations.js";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET ;

export const createCard = async (req, res) => {
  const { title, description, creator } = req.body;

  try {
    if (!title || !description || !creator) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newCard = new cardMessage({
      title,
      description,
      creator,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const cards = async (req, res) => {
  try {
    const allCards = await cardMessage.find();

    res.status(200).json(allCards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const allCard = async (req, res) => {
  try {
    const allData = await cardMessage.find();

    res.status(200).json(allData);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  const _id = req.body._id;
  try {
    if (!_id) {
      return res.status(200).json({ message: "missing field" });
    }
    await cardMessage.deleteOne({ _id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editCard = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.json({ message: "Missing field" });
    }

    const { title, description, creator } = req.body;
    const updateData = {
      title,
      description,
      creator,
    };
    await cardMessage.findByIdAndUpdate(id, updateData);

    res.status(200).json({ message: "Edited" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const cardById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "missing field" });
    }

    const response = await cardMessage.findOne({ _id: id });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLike = async (req, res) => {
  const _id = req.body._id;
  let count = req.body.count;
  try {
    count += 1;
    if (!_id) {
      return res.json({ message: "Missing field" });
    }
    const updatedLike = {
      likeCount: count,
    };
    await cardMessage.findByIdAndUpdate(_id, updatedLike);
    res.status(200).json({ message: "updated like count" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const setCookie = async (req, res) => {
  try {
    const _id = "secretCannotReveal";
    const token = jwt.sign({ _id }, secret);
    await res.cookie("token", token, {
      // secure: true,
      domain: '.onrender.com',
      httpOnly: true,
      // sameSite: "none",
      expires: new Date(Date.now() + 300 * 1000),
    });
    res.status(200).json({ message: "Token Generated and Saved" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyCookie = async (req, res) => {
  const token = req.cookies.token;
  try {
    const tokenExist = jwt.verify(token, secret);
    if (!tokenExist) {
      return res.status(400).json({ message: "Does not Exist" });
    }

    res.status(200).json({ message: "Exist" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const operations = async (req, res) => {
  const token = req.cookies.token;
  const { field } = req.body;
  try {
    if (!token) {
      return res.status(200).json({ message: "missing field" });
    }
    const response = await operationModel.findOne({ token });
    if (response) {
      if (field === "edit" && response.editRemain === true) {
        await operationModel.findByIdAndUpdate(
          { _id: response._id },
          { editRemain: false }
        );
        res.status(200).json({ edit: "Allow Edit" });
      } else if (field === "delete" && response.deleteRemain === true) {
        await operationModel.findByIdAndUpdate(
          { _id: response._id },
          { deleteRemain: false }
        );
        res.status(200).json({ delete: "Allow Delete" });
      } else {
        res.status(200).json({ message: "NO" });
      }
    } else {
      if (field === "edit") {
        await operationModel.create({
          token,
          editRemain: false,
        });
        res.status(200).json({ message: "Created" });
      } else if (field === "delete") {
        await operationModel.create({
          token,
          deleteRemain: false,
        });
        res.status(200).json({ message: "Created" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
