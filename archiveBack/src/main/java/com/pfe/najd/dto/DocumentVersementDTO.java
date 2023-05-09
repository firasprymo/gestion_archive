package com.pfe.najd.dto;

import com.pfe.najd.entities.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentVersementDTO {

    private List<Document> document;
}
