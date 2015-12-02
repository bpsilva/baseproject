/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.controller;

import java.security.Principal;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author bpsilva
 */
@RestController

public class Controller {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(Controller.class);
        
    @RequestMapping(value = "/hello", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public HttpEntity<String> getResource() {
        String hello = "hello world!";
        log.info(hello);
        return new ResponseEntity<>(hello, HttpStatus.OK);
    }

    @RequestMapping("/user")
    public Principal user(Principal user) {
        return user;
    }

}
