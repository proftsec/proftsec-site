---
title: "ETR-2: AI & ML for Threat Detection Lab"
description: "Build and test anomaly detection models using Python and machine learning libraries to identify cybersecurity threats in log data."
date: 2025-03-22
tags: ["Artificial Intelligence", "Machine Learning", "Anomaly Detection", "Security Operations"]
categories: ["Emerging Technologies & Research"]
draft: false
---

# ETR-2: AI & ML for Threat Detection Lab

## **Overview**
In this lab, you'll apply machine learning techniques to detect anomalies in log data—mimicking how AI supports SOC teams. You'll use Python tools such as scikit-learn or PyCaret to train unsupervised models and compare results to traditional rule-based detection.

---

## **Lab Instructions**

### **1. Setting Up Your Environment**
You will need:
- Python 3.9+
- Jupyter Notebook or Google Colab
- Install required libraries:
```bash
pip install pandas matplotlib seaborn scikit-learn pycaret
```

Download a sample log dataset (or use the instructor-provided logs). Suggested sources:
- [Kaggle: Security Logs Dataset](https://www.kaggle.com/datasets)
- Custom CSV of simulated firewall or endpoint events

---

### **2. Data Preprocessing**
1. Load the dataset into a pandas DataFrame
2. Perform basic cleaning (drop nulls, normalize fields)
3. Encode categorical variables if needed

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder

logs = pd.read_csv("security_logs.csv")
logs.dropna(inplace=True)
encoder = LabelEncoder()
logs['event_type'] = encoder.fit_transform(logs['event_type'])
```

---

### **3. Build an Unsupervised Anomaly Detection Model**
Use Isolation Forest or One-Class SVM:

```python
from sklearn.ensemble import IsolationForest
model = IsolationForest(contamination=0.05)
model.fit(logs)
logs['anomaly'] = model.predict(logs)
```

A value of `-1` in the `anomaly` column indicates a flagged event.

📝 **Checkpoint:** Visualize anomalous events using matplotlib or seaborn.

---

### **4. Evaluate Detection Results**
1. How many anomalies were detected?
2. Do the flagged events align with what you'd expect in real-world SOC environments?
3. If using labeled data, calculate accuracy, precision, recall, and F1-score.

```python
from sklearn.metrics import classification_report
print(classification_report(true_labels, logs['anomaly']))
```

---

### **5. Compare Against Rule-Based Detection**
1. Create a basic threshold or rule (e.g., flag logins outside business hours)
2. Count how many events it detects vs ML model
3. Analyze overlaps and gaps between rule-based and ML-based results

---

### **6. Refine the Model or Try Alternatives**
- Use `PyCaret` to rapidly test different models:
```python
from pycaret.anomaly import *
exp = setup(data=logs, normalize=True)
model = create_model('iforest')
assignments = assign_model(model)
```
- Try DBSCAN, One-Class SVM, or Autoencoders

---

## **Final Submission**
Submit a short report that includes:
- Your dataset and preprocessing steps
- Screenshots of model outputs and visualizations
- Comparison between rule-based and ML-based detection
- A paragraph on how AI can improve SOC efficiency and accuracy

🚀 **Well done! You’ve used machine learning to detect threats just like an AI-driven SOC!** 🚀
