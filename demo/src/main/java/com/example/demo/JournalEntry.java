package com.example.demo;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    private String text;

    private String mood;

    private LocalDateTime createdAt;

    public JournalEntry() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
