function LoginCustomerForm() {
    return (
        <section className="flex flex-col gap-2 px-6 mb-6">
            <form>
                <div className="flex flex-col gap-1">
                    <label htmlFor="customer_email" className="font-medium">
                        Email
                    </label>

                    <input
                        id="customer_email"
                        type="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="p-3 border rounded-md"
                        required
                    />
                </div>
            </form>
        </section>
    )
}

export default LoginCustomerForm