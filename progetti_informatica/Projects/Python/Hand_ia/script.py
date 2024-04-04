import cv2 
import HandTrackingModule as htm
import math

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 800)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 500)
cv2.namedWindow("BeyondMinds", cv2.WINDOW_NORMAL)
cv2.resizeWindow("BeyondMinds", 960, 540)

detector = htm.handDetector(detectionCon = 0.75)

while True:

    success, frame = cap.read()
    frame = cv2.flip(frame, 1)

    img = detector.findHands(frame)
    lmList = detector.findPosition(img)
    
    if len(lmList) != 0:
        x1, y1 = lmList[4][1], lmList[4][2]
        x2, y2 = lmList[8][1], lmList[8][2]
        cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

        cv2.circle(img, (x1, y1), 10, (255, 0, 128), cv2.FILLED)
        cv2.circle(img, (x2, y2), 10, (255, 0, 128), cv2.FILLED)
        cv2.line(img, (x1, y1), (x2, y2), (255, 0, 128), 3)
        distance = round(math.hypot(x2 - x1, y2 - y1), 2)
        cv2.putText(img, str(distance), (cx+30, cy), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 0, 128), 3)


    if success:
        cv2.imshow("BeyondMinds", img)
        if cv2.waitKey(1) == ord('q'):
            break
cv2.destroyAllWindows()