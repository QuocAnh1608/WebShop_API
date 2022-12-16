package com.poly.rest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poly.entity.Account;
import com.poly.service.AccountService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/accounts")
public class AccountRestController {

	@Autowired
	AccountService accser;

	
	@GetMapping
	public List<Account> getAccounts(@RequestParam("admin") Optional<Boolean> admin)
	{
		if(admin.orElse(false))
		{
			return accser.getAdministrators();
		}
		return accser.findAll();
	}
	
	@PostMapping
	public Account create(@RequestBody Account acc) {
		return accser.create(acc);
	}
	
	@PutMapping("{id}")
	public Account put(@PathVariable("id") String id,@RequestBody Account acc)
	{
		return accser.update(acc);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") String id)
	{
		accser.delete(id);
	}
}
