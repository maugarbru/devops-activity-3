# Terraform para ENFASIS: DEVOPS ultima entrega

# Azure Provider y version
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configurar el Microsoft Azure Provider
provider "azurerm" {
  features {}
}

# Grupo de recursos para que todo quede relacionado a este
resource "azurerm_resource_group" "last_devops" {
  name     = "last_devops_group"
  location = "West US"
}

# Red Virtual
resource "azurerm_virtual_network" "last_devops" {
  name                = "last_devops-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.last_devops.location
  resource_group_name = azurerm_resource_group.last_devops.name
}

# Subred 
resource "azurerm_subnet" "last_devops" {
  name                 = "last_devops-internal"
  resource_group_name  = azurerm_resource_group.last_devops.name
  virtual_network_name = azurerm_virtual_network.last_devops.name
  address_prefixes     = ["10.0.2.0/24"]
}

# Interfaz de red y configuracion de la IP
resource "azurerm_network_interface" "last_devops" {
  name                = "last_devops-nic"
  location            = azurerm_resource_group.last_devops.location
  resource_group_name = azurerm_resource_group.last_devops.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.last_devops.id
    private_ip_address_allocation = "Dynamic"
  }
}

# Creacion de la maquina virtual ubuntu
resource "azurerm_linux_virtual_machine" "last_devops" {
  name                = "last_devops-machine"
  resource_group_name = azurerm_resource_group.last_devops.name
  location            = azurerm_resource_group.last_devops.location
  size                = "Standard_B1s"
  admin_username      = "azureuser"
  network_interface_ids = [
    azurerm_network_interface.last_devops.id,
  ]

  admin_password = "j85dEzfXNCxVyB"
  disable_password_authentication = false

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts"
    version   = "latest"
  }
}

# SQL Server para la base de datos
resource "azurerm_sql_server" "last_devops" {
  name                         = "mssqlserver"
  resource_group_name          = azurerm_resource_group.last_devops.name
  location                     = azurerm_resource_group.last_devops.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = "cgEN5eXTp5FxSP"

  tags = {
    environment = "production"
  }
}