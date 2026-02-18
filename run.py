from app import create_app

#Entry point for running the flask application

app = create_app("development")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5555)