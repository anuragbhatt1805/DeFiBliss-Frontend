import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  TextField,
  Paper,
  Container,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputAdornment from "@mui/material/InputAdornment";
import { DoneAll } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import { getTransactionId } from "../../Utils/image.utils";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken, proofs } from "../../Utils/baseStore";
import { BaseURL } from "../../constant";

interface UploadState {
  file: File | null;
  uploadProgress: number;
  aiVerificationStatus: "idle" | "processing" | "completed" | "failed";
  aiScore: number | null;
  originalityCheck: "processing" | "completed" | "failed";
  original: boolean;
}

interface ImageDetails {
  title: string;
  description: string;
  category: string;
  price: number;
}

const ACCEPTED_FILE_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

const DropzoneArea = styled(Box)(({ theme }) => ({
  border: `2px dashed white`,
  borderRadius: 20,
  padding: theme.spacing(6),
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#00b894",
  },
}));

const UploadForm: React.FC = () => {
  useSignals();
  const [CATEGORIES, setCategory] = useState<string[]>([]);
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploadProgress: 0,
    aiVerificationStatus: "idle",
    aiScore: null,
    originalityCheck: "processing",
    original: false,
  });

  const [imageDetails, setImageDetails] = useState<ImageDetails>({
    title: "",
    description: "",
    category: "",
    price: 0,
  });

  useEffect(() => {
    fetch(`${BaseURL}/category`)
      .then((response) => response.json())
      .then((data) => {
        const categories = Object.values(data?.data || {}).map(
          (category: any) => category.name
        );
        setCategory(categories);
      });
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadState((prev) => ({
      ...prev,
      file,
      uploadProgress: 0,
      aiVerificationStatus: "processing",
    }));

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadState((prev) => ({
        ...prev,
        uploadProgress: Math.min(prev.uploadProgress + 10, 100),
      }));
    }, 200);

    // Simulate AI verification API call
    try {
      const formData = new FormData();
      formData.append("media", file);
      formData.append("models", "genai,deepfake");
      formData.append("api_user", import.meta.env.VITE_SIGHT_IMAGE_API_USAGE);
      formData.append("api_secret", import.meta.env.VITE_SIGHT_IMAGE_API_KEY);
      const response = await fetch(
        "https://api.sightengine.com/1.0/check.json",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      const mockAiScore = data?.type?.ai_generated;

      setUploadState((prev) => ({
        ...prev,
        aiVerificationStatus: "completed",
        aiScore: mockAiScore,
        uploadProgress: 100,
      }));

      const formData1 = new FormData();
      formData1.append("image", file);
      await fetch(`${BaseURL}/arts/checkoriginal`, {
        method: "POST",
        body: formData1
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUploadState((prev) => ({
            ...prev,
            originalityCheck: "completed",
            original: data.success,
          }));
        })
        .catch((error) => {
          console.log(error);
          setUploadState((prev) => ({
            ...prev,
            originalityCheck: "failed",
            original: false,
          }));
        });
    } catch (error) {
      setUploadState((prev) => ({
        ...prev,
        aiVerificationStatus: "failed",
        originalityCheck: "failed"
      }));
    }

    clearInterval(interval);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadState.file || uploadState.aiScore === null) return;

    const { transactionId } = await getTransactionId({
      walletAddress: accountToken.value || "",
      signature: proofs.value?.signature || "",
      username: proofs.value?.username || "",
      timestamp: Date.now(),
    });

    const formData = new FormData();
    formData.append("image", uploadState.file);
    formData.append("title", imageDetails.title);
    formData.append("description", imageDetails.description);
    formData.append("category", imageDetails.category);
    formData.append("transactionId", transactionId);
    formData.append("price", `${imageDetails.price}`);
    formData.append("verification_rate", `${uploadState.aiScore * 100}`);
    formData.append("walletAddress", accountToken.value || "");
    formData.append("signature", proofs.value?.signature || "");

    const response = await fetch(`${BaseURL}/arts/add`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      console.log("Success:", data);
    } else {
      console.error("Error:", data);
    }

    // Submit to your API here
    console.log("Submitting:", formData);
  };

  const handleReset = () => {
    setUploadState({
      file: null,
      uploadProgress: 0,
      aiVerificationStatus: "idle",
      aiScore: null,
      originalityCheck: "processing",
      original: false,
    });
    setImageDetails({
      title: "",
      description: "",
      category: "",
      price: 0,
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom mt={4}>
        Upload Artwork
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 10 }}>
        {!uploadState.file ? (
          <DropzoneArea {...getRootProps()}>
            <input {...getInputProps()} />
            <CloudUploadIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              {isDragActive
                ? "Drop your image here"
                : "Drag and drop your image here"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              or
            </Typography>
            <Button
              variant="contained"
              component="span"
              sx={{ bgcolor: "#00b894" }}
            >
              Browse Files
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              Supported formats: PNG, JPG, JPEG (Max size: 20MB)
            </Typography>
          </DropzoneArea>
        ) : (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ flexGrow: 1 }}>
                {uploadState.file.name}
              </Typography>
              <Typography>{Math.round(uploadState.uploadProgress)}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={uploadState.uploadProgress}
              sx={{
                bgcolor: "#00b894",
              }}
            />
          </Box>
        )}
      </Paper>

      {uploadState.aiVerificationStatus !== "idle" && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Verification Status
          </Typography>
          {uploadState.aiVerificationStatus === "processing" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={24} sx={{ mr: 2 }} />
              <Typography>Processing Image</Typography>
            </Box>
          )}
          {uploadState.aiVerificationStatus === "completed" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {uploadState.aiScore && uploadState.aiScore >= 0.5 ? (
                <>
                  <CloseIcon fontSize="large" sx={{ mr: 2, color: "red" }} />
                  <Typography>
                    Image is {uploadState.aiScore * 100}% AI Generated
                  </Typography>
                </>
              ) : (
                <>
                  <DoneAll fontSize="large" sx={{ mr: 2, color: "green" }} />
                  <Typography>
                    Image is {(uploadState.aiScore || 0.02) * 100}% AI Generated
                  </Typography>
                </>
              )}
            </Box>
          )}
          {uploadState.aiVerificationStatus === "failed" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ErrorOutlineIcon fontSize="large" sx={{ mr: 2, color: "red" }} />
              <Typography>Processing Image</Typography>
            </Box>
          )}
        </Paper>
      )}

      {uploadState.aiVerificationStatus === "completed" &&
        uploadState.aiScore !== null &&
        uploadState.aiScore < 0.5 && (
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Authenticity of Image
            </Typography>
            {uploadState.originalityCheck === "processing" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={24} sx={{ mr: 2 }} />
                <Typography>Checking Image Originality</Typography>
              </Box>
            )}
            {uploadState.originalityCheck === "completed" && (
              uploadState.original ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <DoneAll fontSize="large" sx={{ mr: 2, color: "green" }} />
                <Typography>Image is Original</Typography>
              </Box>
              ):(
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <ErrorOutlineIcon fontSize="large" sx={{ mr: 2, color: "red" }} />
                <Typography>Image is Tampered</Typography>
              </Box>
              )
            )}
            {uploadState.originalityCheck === "failed" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ErrorOutlineIcon
                  fontSize="large"
                  sx={{ mr: 2, color: "red" }}
                />
                <Typography>Image is not Owned By Someone else</Typography>
              </Box>
            )}
          </Paper>
        )}

      {uploadState.aiScore !== null &&
        uploadState.aiScore < 0.5 &&
        uploadState.original && (
          <Paper
            elevation={3}
            sx={{
              p: 3,
              bgcolor: "rgba(38, 38, 38, 0.95)",
              borderRadius: "8px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 3, color: "#fff" }}>
                Image Details
              </Typography>

              <Typography sx={{ mb: 1, color: "#fff" }}>
                Artist Title
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                sx={{
                  mb: 3,
                  "& .MuiFilledInput-root": {
                    bgcolor: "rgba(45, 45, 45, 0.95)",
                    "&:hover, &.Mui-focused": {
                      bgcolor: "rgba(55, 55, 55, 0.95)",
                    },
                  },
                }}
                value={imageDetails.title}
                onChange={(e) =>
                  setImageDetails((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />

              <Typography sx={{ mb: 1, color: "#fff" }}>
                Art Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="filled"
                sx={{
                  mb: 3,
                  "& .MuiFilledInput-root": {
                    bgcolor: "rgba(45, 45, 45, 0.95)",
                    "&:hover, &.Mui-focused": {
                      bgcolor: "rgba(55, 55, 55, 0.95)",
                    },
                  },
                }}
                value={imageDetails.description}
                onChange={(e) =>
                  setImageDetails((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />

              <Typography sx={{ mb: 1, color: "#fff" }}>Price</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                sx={{
                  mb: 3,
                  "& .MuiFilledInput-root": {
                    bgcolor: "rgba(45, 45, 45, 0.95)",
                    "&:hover, &.Mui-focused": {
                      bgcolor: "rgba(55, 55, 55, 0.95)",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={imageDetails.price}
                onChange={(e) =>
                  setImageDetails((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value),
                  }))
                }
              />

              {/* <Typography sx={{ mb: 1, color: "#fff" }}>Category</Typography> */}
              <Typography sx={{ mb: 1, color: "#fff" }}>Category</Typography>
              <Select
                fullWidth
                name="category"
                variant="filled"
                value={imageDetails.category || ""}
                onChange={(e) =>
                  setImageDetails((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                sx={{
                  mb: 3,
                  "& .MuiFilledInput-root": {
                    bgcolor: "rgba(45, 45, 45, 0.95)",
                    "&:hover, &.Mui-focused": {
                      bgcolor: "rgba(55, 55, 55, 0.95)",
                    },
                  },
                  "& .MuiSelect-select": {
                    color: "#fff",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleReset}
                  sx={{
                    bgcolor: "rgba(75, 75, 75, 0.95)",
                    "&:hover": {
                      bgcolor: "rgba(85, 85, 85, 0.95)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!accountToken.value && !proofs.value}
                  sx={{
                    background:
                      "linear-gradient(90deg, #00BFA5 0%, #2979FF 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #00AB95 0%, #2567E8 100%)",
                    },
                  }}
                >
                  Upload
                </Button>
              </Box>
            </form>
          </Paper>
        )}
    </Container>
  );
};

export default UploadForm;
