package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/ghost9742/fullStack-todo-app/db"
	"github.com/ghost9742/fullStack-todo-app/models"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	db.Connect()
	router := mux.NewRouter()

	router.HandleFunc("/posts", getPosts).Methods("GET")
	router.HandleFunc("/posts/{id}", getPost).Methods("GET")
	router.HandleFunc("/posts", createPost).Methods("POST")
	router.HandleFunc("/posts/{id}", updatePost).Methods("PUT")
	router.HandleFunc("/posts/{id}", deletePost).Methods("DELETE")

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type"},
	}).Handler(router)

	fmt.Println("Server started at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", handler))
}

func getPosts(w http.ResponseWriter, r *http.Request) {
	var posts []models.Post
	db.DB.Find(&posts)
	json.NewEncoder(w).Encode(posts)
}

func getPost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var post models.Post
	if err := db.DB.First(&post, params["id"]).Error; err != nil {
		http.NotFound(w, r)
		return
	}
	json.NewEncoder(w).Encode(post)
}

func createPost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	_ = json.NewDecoder(r.Body).Decode(&post)
	db.DB.Create(&post)
	json.NewEncoder(w).Encode(post)
}

func updatePost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var post models.Post
	if err := db.DB.First(&post, params["id"]).Error; err != nil {
		http.NotFound(w, r)
		return
	}
	_ = json.NewDecoder(r.Body).Decode(&post)
	db.DB.Save(&post)
	json.NewEncoder(w).Encode(post)
}

func deletePost(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var post models.Post
	if err := db.DB.First(&post, params["id"]).Error; err != nil {
		http.NotFound(w, r)
		return
	}
	db.DB.Delete(&post)
	json.NewEncoder(w).Encode(map[string]string{"message": "deleted"})
}
