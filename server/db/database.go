package db

import (
	"log"

	"github.com/ghost9742/fullStack-todo-app/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	database, err := gorm.Open(sqlite.Open("posts.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database", err)
	}

	database.AutoMigrate(&models.Post{})
	DB = database
}
