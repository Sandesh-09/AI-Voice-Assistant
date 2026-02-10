import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import moment from "moment";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get current user error ${error}` });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `update assistant error ${error}` });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    user.history.push(command);
    user.save();
    const userName = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command, assistantName, userName);
    console.log("Gemini raw result:", result);

    let gemResult;
    try {
      const jsonMatch = result.match(/{[\s\S]*}/);
      if (!jsonMatch) throw new Error("No JSON found");
      gemResult = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.log("Gemini returned invalid JSON:", result);
      return res.status(200).json({
        type: "general",
        userInput: command,
        response: result,
      });
    }

    const type = gemResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today’s date is ${moment().format("DD-MM-YYYY")}`,
        });

      case "get_time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Current time is ${moment().format("hh:mm A")}`,
        });

      case "get_day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `This month is ${moment().format("MMMM")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "instagram_open":
      case "facebook_open":
      case "calculator_open":
      case "weather-show":
      case "general":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });

      default:
        return res.json({
          type: "general",
          userInput: gemResult.userInput,
          response: gemResult.response || "I'm not sure how to do that.",
        });
    }
  } catch (error) {
    console.error("askToAssistant error:", error);
    return res
      .status(500)
      .json({ message: `ask to assistant error ${error.message}` });
  }
};
