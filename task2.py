import cv2
import numpy as np
circle=0
triangle=0
rectangle=0
square=0
# Load the image
image_path = '0.jpg'  # Path to the uploaded image
image = cv2.imread(image_path)

# Convert the image to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Apply a stronger GaussianBlur to reduce noise and smooth the image
blurred = cv2.GaussianBlur(gray, (3, 3), 9)

# Adjusted Canny Edge Detection thresholds for better shape detection
median_val = np.median(blurred)
lower_thresh = int(max(90, 0.3 * median_val))
upper_thresh = int(min(255, 1.6 * median_val))

# Apply Canny Edge Detection
edges = cv2.Canny(blurred, lower_thresh, upper_thresh)

# Apply morphological operations to refine the edges
kernel = np.ones((3, 3), np.uint8)
edges = cv2.dilate(edges, kernel, iterations=1)  # Dilation to enhance edges
edges = cv2.erode(edges, kernel, iterations=1)   # Erosion to reduce noise

# Find contours from the edges in the image
contours, _ = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

# Convert the grayscale image back to color to draw colored shapes
draw_image = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

# Function to detect and label shapes in the image
def detect_and_label_shape(contour, existing_centroids):
    global circle, triangle, rectangle, square  # Declare the global variables
    # Approximate the contour to reduce the number of points
    approx = cv2.approxPolyDP(contour, 0.039 * cv2.arcLength(contour, True), True)
    x, y, w, h = cv2.boundingRect(approx)  # Get the bounding box for the contour
    M = cv2.moments(contour)  # Calculate image moments to find the centroid
    if M["m00"] != 0:
        cx = int(M["m10"] / M["m00"])  # X-coordinate of centroid
        cy = int(M["m01"] / M["m00"])  # Y-coordinate of centroid
    else:
        cx, cy = 0, 0
    
    # Check if a similar shape (based on the centroid) has already been detected
    for (ex, ey) in existing_centroids:
        if np.sqrt((cx - ex) ** 2 + (cy - ey) ** 2) < 50:  # Distance threshold to avoid duplicate detections
            return existing_centroids  # Skip if too close to an existing centroid

    # Determine the shape type based on the number of vertices
    if len(approx) == 3:
        shape_type = "Triangle"
        triangle+=1
    elif len(approx) == 4:
        aspect_ratio = w / float(h)
        shape_type = "Square" if 0.95 <= aspect_ratio <= 1.05 else "Rectangle" 
        if shape_type=="Square":square+=1
        elif shape_type=="Rectangle":rectangle+=1
        
    elif len(approx) > 5:
        shape_type = "Circle"
        circle+=1
    else:
        shape_type = ""
        rectangle+=1

    # Draw and label the shape on the image
    cv2.drawContours(draw_image, [approx], -1, (0, 255, 0), 3)  # Draw the contour in green
    cv2.putText(draw_image, shape_type, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Add the centroid of this shape to the list of detected centroids
    existing_centroids.append((cx, cy))
    return existing_centroids

# Iterate through each contour to detect and label shapes
existing_centroids = []
for contour in contours:
    if cv2.contourArea(contour) > 10:  # Filter out small contours by area
        existing_centroids = detect_and_label_shape(contour, existing_centroids)

# Save the result as an image file
output_path = '0.png'
print(f"we have {circle}circles ,{rectangle} rectangle,{square} square,{triangle} triangle")
cv2.imwrite(output_path, draw_image)

# Display the path of the saved image
output_path
