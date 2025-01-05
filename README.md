
# 🌍 Arabic Text Classification and Summarization  

This repository hosts the code and resources for a project focusing on **Arabic text classification** and **summarization**. The project utilizes advanced **Natural Language Processing (NLP)** techniques to classify news articles and generate summaries from Arabic news websites like **Al Jazeera**.  

---

## 📋 Table of Contents  

1. [✨ Features](#-features)  
2. [🛠️ Technologies Used](#-technologies-used)  
3. [📁 Project Structure](#-project-structure)  
4. [⚙️ Installation](#%EF%B8%8F-installation)  
5. [🚀 Usage](#-usage)  
6. [📜 License](#-license)  

---

## ✨ Features  

- **Arabic Text Classification**:  
  - Developed using **LSTM (Long Short-Term Memory)** and **GRU (Gated Recurrent Unit)** architectures.  
  - Classifies Arabic news articles into predefined categories.  

- **Arabic Text Summarization**:  
  - Utilizes **AraBERT**, a pre-trained transformer model optimized for Arabic.  
  - Generates concise and accurate summaries of news articles.  

- **Web Application**:  
  - Built using **Next.js** for the frontend and **Django** for the backend.  
  - User-friendly interface for uploading, classifying, and summarizing Arabic texts.  

---

## 🛠️ Technologies Used  

### Machine Learning & NLP  
- **🧠 LSTM** and **GRU**: Deep learning models for classification.  
- **🤖 AraBERT**: Pre-trained model for summarization.  

### Web Development  
- **🌐 Next.js**: Frontend framework for a modern, responsive UI.  
- **🖥️ Django**: Backend framework for handling APIs and server-side logic.  

### Tools & Libraries  
- **📦 TensorFlow/Keras**: For building and training deep learning models.  
- **📚 Hugging Face Transformers**: For leveraging AraBERT.  
- **🗄️ PostgreSQL**: Database for managing news articles and summaries.  

---

## 📁 Project Structure  

```plaintext  
├── backend/  
│   ├── api/           # Django API for text classification and summarization  
│   └── models/        # LSTM, GRU, and AraBERT implementations  
├── frontend/  
│   ├── pages/         # Next.js pages and components  
│   └── styles/        # Frontend styles  
├── data/  
│   ├── raw/           # Raw dataset of Arabic news articles  
│   └── processed/     # Processed and tokenized datasets  
├── notebooks/         # Jupyter notebooks for experimentation  
└── README.md          # Project documentation  
```  

---

## ⚙️ Installation  

### Prerequisites  
- **🐍 Python 3.8+**  
- **📦 Node.js 14+**  
- **🗄️ PostgreSQL**  

### Backend Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/arabic-nlp-project.git  
   cd arabic-nlp-project/backend  
   ```  
2. Install dependencies:  
   ```bash  
   pip install -r requirements.txt  
   ```  
3. Run migrations and start the server:  
   ```bash  
   python manage.py migrate  
   python manage.py runserver  
   ```  

### Frontend Setup  
1. Navigate to the frontend directory:  
   ```bash  
   cd ../frontend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the development server:  
   ```bash  
   npm run dev  
   ```  

---
## 🚀 Usage  

1. Launch the web application:  
   - Backend: `http://localhost:8000`  
   - Frontend: `http://localhost:3000`  

2. Upload an Arabic news article via the UI.  

3. Select:  
   - **Classification**: Get the category of the article.  
   - **Summarization**: Get a concise summary of the article.  

### Example Screenshots  

**Upload an Article:**  
![Upload Article UI](path/to/your/image1.png)  

**Classification and Summarization Results:**  
![Results Page](path/to/your/image2.png)  


---

## 📜 License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

---  
