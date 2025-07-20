@component('mail::message')
# You're Invited!

Hello,

You’ve been invited to join the company

Click the button below to accept the invitation.

@component('mail::button', ['url' => $acceptUrl])
Accept Invitation
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
