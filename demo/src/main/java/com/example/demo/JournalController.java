package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/journal")
public class JournalController {

    @Autowired
    private JournalRepository repository;

    // Save entry
    @PostMapping
    public JournalEntry saveEntry(@RequestBody JournalEntry entry) {

        return repository.save(entry);
    }

    // Get all entries
    @GetMapping
    public List<JournalEntry> getAllEntries() {

        return repository.findAll();
    }

    // Delete entry
    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {

        repository.deleteById(id);
    }
}