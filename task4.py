import cv2
import numpy as np

# Load the two images
img1 = cv2.imread('diff1.jpg')
img2 = cv2.imread('diff2.jpeg')

# Convert images to grayscale
gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

# Compute the absolute difference between the two grayscale images
diff = cv2.absdiff(gray1, gray2)

# Apply a binary threshold to get a binary image of the differences
_, diff_bin = cv2.threshold(diff, 50, 255, cv2.THRESH_BINARY)

# Find contours of the differences
contours, _ = cv2.findContours(diff_bin, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Create a mask image for the differences
mask = np.zeros_like(img1)

# Draw filled contours to highlight the differences
for contour in contours:
    if cv2.contourArea(contour) > 40:  # Filter small differences (you can adjust this value)
        cv2.drawContours(mask, [contour], -1, (125, 125, 125), -1)  # Fill the contour with red color

# Overlay the mask on the original image
highlighted_img1 = cv2.addWeighted(img1, 1, mask, 0.5, 0)
highlighted_img2 = cv2.addWeighted(img2, 1, mask, 0.5, 0)

# Combine the images for display
combined = np.hstack((highlighted_img1, highlighted_img2))

# Save the result
cv2.imwrite('highlighted_differences.jpg', combined)
