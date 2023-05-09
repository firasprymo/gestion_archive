package com.pfe.najd.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pfe.najd.Enum.DocumentStatus;
import com.pfe.najd.Enum.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class DocumentRequest  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private RequestStatus status;
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "document_id")
    private Document document;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
