package com.pfe.najd.controller;

import com.pfe.najd.Enum.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestStatusDTO {
     private RequestStatus status;
}
