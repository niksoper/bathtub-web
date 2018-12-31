# Deploys the REST API
trap { 
  echo "Unexpected error while executing script";
  echo $_.Exception.Message;
  exit 1;
}

Import-Module WebAdministration

[string] $application = "emortal-web-admin"
[string] $applicationRoot = Resolve-Path .
[string] $ip = "0.0.0.0"
[int] $httpPort = 90

$appPoolExists = Test-Path IIS:\AppPools\$application
$websiteExists = Test-Path IIS:\Sites\$application

# remove the existing website and application pool
if ($appPoolExists -and (Get-WebAppPoolState $application).Value -ne "Stopped")
{
  echo "Stopping application pool..."
  Stop-WebAppPool -name $application
}

if ($websiteExists -and (Get-WebsiteState $application).Value -ne "Stopped")
{
  echo "Stopping website..."
  Stop-Website -name $application
}

while ($websiteExists -and (Get-WebsiteState $application).Value -ne "Stopped")
{
  echo "Waiting for website to stop..."
  Sleep -Seconds 1
}

while ($appPoolExists -and (Get-WebAppPoolState $application).Value -ne "Stopped")
{
  echo "Waiting for application pool to stop..."
  Sleep -Seconds 1
}

if ($websiteExists)
{
  echo "Removing website..."
  Remove-Website -name $application -Confirm:$false
}

if ($appPoolExists)
{
  echo "Removing application pool..."
  Remove-WebAppPool -name $application -Confirm:$false
}

# create the application pool
echo "Creating application pool..."
$pool = New-WebAppPool -name $application -force
$pool.processModel.idleTimeout = [TimeSpan]::FromMinutes(0)
$pool.processModel.identityType = 2
$pool.managedRuntimeVersion = "v4.0"
$pool | Set-Item

echo "Application pool state..."
Get-WebAppPoolState $application

$websitePath = "$applicationRoot\WebAdmin"

# set the environment
echo "Writing environment.txt based on Octopus variable EnvironmentName: $EnvironmentName ..."
$EnvironmentName | Out-File -FilePath "$websitePath\environment.txt"

# create the website
echo "Creating website at $websitePath..."
New-Website -Name $application -PhysicalPath "$websitePath" -Port $httpPort -ApplicationPool $application

# configure general properties (script execution, default document, etc.)
echo "Configuring website..."
Set-WebConfigurationProperty -PSPath IIS:\Sites\$application -filter /system.webserver/handlers -name accessPolicy -value "Read,Script"
Set-WebConfigurationProperty -PSPath IIS:\Sites\$application -filter /system.webserver/defaultDocument -name files -value @{value="index.html"}

# Open firewall for Octopus
$ruleName = "EmortalWebAdmin"
$firewallRule = Get-NetFirewallRule -Name $ruleName -ErrorAction Ignore

if ($firewallRule) {
  echo "Removing previous firewall rule: $ruleName..."
  Remove-NetFirewallRule -Name $ruleName
}

echo "Creating firewall rule for port $httpPort..."
New-NetFirewallRule -Name $ruleName -DisplayName "Emortal admin website" -Profile Any -LocalPort $httpPort -Direction Inbound -Protocol TCP
