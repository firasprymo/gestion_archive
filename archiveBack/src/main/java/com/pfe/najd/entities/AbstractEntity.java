package com.pfe.najd.entities;

import lombok.Data;
import org.springframework.data.annotation.*;

import javax.persistence.*;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@MappedSuperclass
public class AbstractEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @CreatedDate
    @Column(name = "creationDate", nullable = false,updatable = false)
    private LocalDate creationDate;

    @LastModifiedDate
    @Column(name = "lastModifiedDate")
    private LocalDate lastModifiedDate;

    @PrePersist
    void onCreate() {
        this.setCreationDate(LocalDate.now());
        this.setLastModifiedDate(LocalDate.now());
    }

    @PreUpdate
    void onUpdate() {
        this.setLastModifiedDate(LocalDate.now());
    }
}
