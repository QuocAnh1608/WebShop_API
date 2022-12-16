package com.poly.service;

import java.util.List;

import com.poly.entity.Account;
import com.poly.entity.Product;

public interface AccountService {
	Account findById(String username);

	List<Account> getAdministrators();

	List<Account> findAll();

	Account create(Account acc);

	void delete(String id);

	Account update(Account id);
}
